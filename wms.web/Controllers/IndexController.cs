using wms.web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace wms.web.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api")]
    public class IndexController : BaseController
    {

        private IApiHelper _apiHelper;
        public IndexController(IApiHelper apiHelper)
        {
            this._apiHelper = apiHelper;
        }

        [HttpPost("{**url}")]
        [HttpGet("{**url}")]
        [HttpPut("{**url}")]
        [HttpDelete("{**url}")]

        public async Task<JsonResult> ForwardRequest(string url)
        {
            try
            {
                object? obj = null;
                var targetUrl = $"/api/{url}";

                if (Request.ContentLength > 0)
                {
                    var requestBodyStream = new StreamContent(Request.Body);
                    obj = ConvertStreamContentToObject<object>(requestBodyStream).Result;
                }
                var queryParameters = Request.QueryString;
                if (queryParameters.HasValue)
                {
                    targetUrl += queryParameters.Value;
                }
                var result = await _apiHelper.ForwardAsync<object>(targetUrl, new HttpMethod(Request.Method), obj);
                return Success<object>(result);

            }
            catch (Exception ex)
            {
                return Error(ex);
            }
        }

        private async Task<T> ConvertStreamContentToObject<T>(HttpContent content)
        {
            var responseString = await content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<T>(responseString);
            return responseObject;
        }
    }
}
