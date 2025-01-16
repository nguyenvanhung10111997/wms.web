using infrastructure.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using wms.infrastructure.Extensions;
using wms.infrastructure.Helpers;
using wms.web.Configs;

namespace wms.web.Attributes
{
    public class WebAuthorizeAttribute : Attribute, IAuthorizationFilter, IFilterMetadata
    {
        private readonly FormOptions _formOptions;
        private readonly bool _authorizeAction;

        public WebAuthorizeAttribute(bool authorizeAction = true)
        {
            _authorizeAction = authorizeAction;

            _formOptions = new FormOptions
            {
                ValueCountLimit = 50000
            };
        }

        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {
            if (filterContext == null)
            {
                filterContext.Result = new UnauthorizedResult();
                return;
            }

            var features = filterContext.HttpContext.Features;
            var formFeature = features.Get<IFormFeature>();

            if (formFeature == null || formFeature.Form == null)
            {
                features.Set((IFormFeature?)new FormFeature(filterContext.HttpContext.Request, _formOptions));
            }

            var userPrincipal = SessionHelper.Get<UserPrincipal>(filterContext.HttpContext.Session, "UserPricinpal");

            if (userPrincipal == null)
            {
                var value = filterContext.HttpContext.Request?.Path.Value;

                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(30.0)
                };

                if (filterContext.HttpContext.Request.Headers.TryGetValue("returnUrl", out var returnUrl))
                {
                    value = returnUrl;
                }

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new UnauthorizedResult();
                    return;
                }

                filterContext.HttpContext.Response.Cookies.Append("returnUrl", value, cookieOptions);
                filterContext.Result = new RedirectResult("~/accounts/login");

                return;
            }

            if ((userPrincipal.ExpiryDate - DateTime.Now).TotalMinutes <= 0.0)
            {
                if (RefreshToken(userPrincipal.RefreshToken, filterContext))
                {
                    return;
                }

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new UnauthorizedResult();
                    return;
                }

                string value2 = filterContext.HttpContext.Request?.Path.Value;
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMinutes(30.0)
                };

                if (filterContext.HttpContext.Request.Headers.TryGetValue("returnUrl", out var returnUrl))
                {
                    value2 = returnUrl;
                }
                filterContext.HttpContext.Response.Cookies.Append("returnUrl", value2, cookieOptions);
                filterContext.Result = new RedirectResult("~/accounts/login");
                return;
            }

            filterContext.HttpContext.User = userPrincipal;
            var action = filterContext.ActionDescriptor.RouteValues["action"] ?? "";
            var controller = filterContext.ActionDescriptor.RouteValues["controller"] ?? "";

            if (!IsAuthorize(action, controller, userPrincipal))
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.Result = new UnauthorizedResult();
                    return;
                }
            }
        }

        private bool IsAuthorize(string action, string controller, UserPrincipal user)
        {
            if (!_authorizeAction)
            {
                return true;
            }

            if (user.UserPermissions == null)
            {
                return false;
            }

            return user.UserPermissions.Any(p => p.APIAction == action && p.APIController == controller);
        }

        private bool RefreshToken(string refreshToken, AuthorizationFilterContext filterContext)
        {
            try
            {
                var data = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("client_id", AppConfig.Oauth2.ClientID),
                    new KeyValuePair<string, string>("client_secret", AppConfig.Oauth2.Secret),
                    new KeyValuePair<string, string>("grant_type", "refresh_token"),
                    new KeyValuePair<string, string>("refresh_token", refreshToken)
                });

                using (HttpClient client = new HttpClient())
                using (HttpResponseMessage response = client.PostAsync(AppConfig.URLConnection.IDSUrl + "/connect/token", data).Result)
                using (HttpContent content = response.Content)
                {
                    var result = content.ReadAsStringAsync().Result;
                    dynamic jsonData = JObject.Parse(result);
                    string token = jsonData.id_token;

                    string newRefreshToken = jsonData.refresh_token;
                    var jwt = new JwtSecurityToken(token);

                    var userPrincipal = new UserPrincipal(token, newRefreshToken, jwt.Claims.ToList());
                    SessionHelper.Set(filterContext.HttpContext.Session, SessionKeys.UserPricinpal, userPrincipal);
                }
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
