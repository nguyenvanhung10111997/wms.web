using infrastructure.Models;
using infrastructure.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using wms.infrastructure.Helpers;
using wms.web.Configs;
using wms.web.Models;

namespace wms.web.Controllers
{
    [ApiController]
    [Route("accounts")]
    [AllowAnonymous]
    public class AccountsController : BaseController
    {
        public AccountsController() : base()
        {
        }

        [HttpGet("login")]
        public ActionResult Login()
        {
            var url = GetIDSUrlLogin();

            return Success(url);
        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {
            var userPricinpal = SessionHelper.Get<UserPrincipal>(HttpContext.Session, SessionKeys.UserPricinpal);
            if (userPricinpal == null)
            {
                return Redirect("/");
            }

            var idtoken = userPricinpal.AccessToken;
            HttpContext.Session.Remove(SessionKeys.UserPricinpal);

            var idsEndPoint = AppConfig.URLConnection.IDSUrl;
            var redirectUrl = AppConfig.URLConnection.ClientUrl;

            var url = string.Format(@"{0}/connect/endsession?post_logout_redirect_uri={1}&id_token_hint={2}&state={3}",
                idsEndPoint, redirectUrl,
                WebUtility.UrlDecode(idtoken),
                Guid.NewGuid().ToString("N"));

            return Success(url);
        }

        [HttpPost("callback")]
        public async Task<ActionResult> Callback()
        {
            try
            {
                var dictForm = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                var code = dictForm["code"] ?? "none";

                if (string.IsNullOrEmpty(code))
                {
                    return RedirectToAction("Login", "Accounts");
                }

                var pairs = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("client_id", AppConfig.Oauth2.ClientID),
                    new KeyValuePair<string, string>("client_secret", AppConfig.Oauth2.Secret),
                    new KeyValuePair<string, string>("grant_type", "authorization_code"),
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("redirect_uri", AppConfig.URLConnection.ClientUrl.ToUrl() + "/accounts/callback")
                };

                var data = new FormUrlEncodedContent(pairs);

                using (var client = new HttpClient())
                using (var response = await client.PostAsync(AppConfig.URLConnection.IDSUrl + "/connect/token", data))
                using (var content = response.Content)
                {
                    var result = await content.ReadAsStringAsync();

                    dynamic jsonData = JObject.Parse(result);
                    string token = jsonData.id_token;

                    string refreshToken = jsonData.refresh_token;

                    var claims = ValidateToken(token);

                    if (claims == null || !claims.Any())
                    {
                        return RedirectToAction("Login", "Accounts");
                    }

                    var userPrincipal = new UserPrincipal(token, refreshToken, claims);
                    SessionHelper.Set(HttpContext.Session, SessionKeys.UserPricinpal, userPrincipal);
                }

                var url = HttpContext.Request.Cookies["returnUrl"] == null ? string.Empty : HttpContext.Request.Cookies["returnUrl"];

                if (!string.IsNullOrEmpty(url))
                {
                    return Redirect(url);
                }
                else
                {
                    return Redirect("/");
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Login", "Accounts");
            }
        }

        [HttpPost("refreshToken")]
        public JsonResult RefreshToken(string refreshToken)
        {
            try
            {
                if (!IsRefreshToken(refreshToken))
                {
                    return Error("Refresh token không thành công");
                }

                var userPrincipal = SessionHelper.Get<UserPrincipal>(HttpContext.Session, SessionKeys.UserPricinpal);

                return Success(userPrincipal);
            }
            catch (Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpGet("relogin")]
        public ActionResult ReLogin(string returnUrl)
        {
            if (!string.IsNullOrEmpty(returnUrl))
            {
                Response.Cookies.Append("returnUrl", returnUrl, options: new CookieOptions { Expires = DateTime.Now.AddMinutes(5) });
            }

            var url = GetIDSUrlLogin();

            return Redirect(url);
        }

        [HttpPost("checkLogin")]
        public JsonResult CheckLogin()
        {
            try
            {
                var userPrincipal = SessionHelper.Get<UserPrincipal>(HttpContext.Session, SessionKeys.UserPricinpal);

                if (userPrincipal == null)
                {
                    return Unauthorized("Phiên đăng nhập hết hạn, vui lòng bấm đồng ý để tải lại trang");
                }

                var duration = userPrincipal.ExpiryDate - DateTime.Now;
                var userlogin = new UserLoginModel(userPrincipal);

                if (duration.TotalMinutes > 0)
                {
                    return Success(userlogin);
                }

                if (!IsRefreshToken(userPrincipal.RefreshToken))
                {
                    return Unauthorized("Phiên đăng nhập hết hạn, vui lòng bấm đồng ý để tải lại trang");
                }

                return Success(userlogin);
            }
            catch (Exception ex)
            {
                return Error(ex.Message);
            }
        }

        #region Private Functions
        private string GetIDSUrlLogin()
        {
            var state = Guid.NewGuid().ToString("N");
            var nonce = Guid.NewGuid().ToString("N");
            var url = AppConfig.URLConnection.IDSUrl + "/connect/authorize" +
                "?client_id=" + AppConfig.Oauth2.ClientID +
                "&response_type=id_token code" +
                "&scope=openid profile offline_access " + AppConfig.Oauth2.Scope +
                "&redirect_uri=" + AppConfig.URLConnection.ClientUrl.ToUrl() + "/accounts/callback" +
                "&post_logout_redirect_uri=" + AppConfig.URLConnection.ClientUrl +
                "&response_mode=form_post" +
                "&state=" + state +
                "&nonce=" + nonce;
            return url;
        }

        private List<Claim> ValidateToken(string token, string nonce)
        {
            var cert = new X509Certificate2(Convert.FromBase64String(AppConfig.JWT.Base64PublicKey));
            var securityKey = new X509SecurityKey(cert);

            var parameters = new TokenValidationParameters
            {
                ValidAudience = AppConfig.Oauth2.ClientID,
                ValidIssuer = AppConfig.JWT.Issuer,
                IssuerSigningKey = securityKey
            };

            var principal = new JwtSecurityTokenHandler().ValidateToken(token, parameters, out SecurityToken jwt);

            var nonceClaim = principal.FindFirst("nonce");

            if (!string.Equals(nonceClaim.Value, nonce, StringComparison.Ordinal))
            {
                return null;
            }

            return principal.Claims.ToList();
        }

        private bool IsRefreshToken(string refreshToken)
        {
            try
            {
                var pairs = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("client_id", AppConfig.Oauth2.ClientID),
                    new KeyValuePair<string, string>("client_secret", AppConfig.Oauth2.Secret),
                    new KeyValuePair<string, string>("grant_type", "refresh_token"),
                    new KeyValuePair<string, string>("refresh_token", refreshToken),
                };

                var data = new FormUrlEncodedContent(pairs);

                using (HttpClient client = new HttpClient())
                using (HttpResponseMessage response = client.PostAsync(AppConfig.URLConnection.IDSUrl + "/connect/token", data).Result)
                using (HttpContent content = response.Content)
                {
                    string result = content.ReadAsStringAsync().Result;
                    dynamic jsonData = JObject.Parse(result);
                    string Token = jsonData.id_token;

                    string newRefreshToken = jsonData.refresh_token;
                    var jwt = new JwtSecurityToken(Token);

                    var userPrincipal = new UserPrincipal(Token, newRefreshToken, jwt.Claims.ToList());
                    SessionHelper.Set(HttpContext.Session, SessionKeys.UserPricinpal, userPrincipal);
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        private List<Claim> ValidateToken(string token)
        {
            try
            {
                var cert = new X509Certificate2(Convert.FromBase64String(AppConfig.JWT.Base64PublicKey));
                var parameters = new TokenValidationParameters
                {
                    AudienceValidator = (a, b, c) => true,
                    ValidIssuer = AppConfig.JWT.Issuer,
                    IssuerSigningKeyResolver = (string token1, SecurityToken securityToken, string kid, TokenValidationParameters validationParameters) 
                        => new List<X509SecurityKey> { new X509SecurityKey(cert) }
                };

                var principal = new JwtSecurityTokenHandler().ValidateToken(token, parameters, out SecurityToken jwt);

                return principal.Claims.ToList();
            }
            catch (Exception ex)
            {
                return new List<Claim>();
            }
        }
        #endregion
    }
}
