using IdentityModel.Client;
using infrastructure.Extensions;
using infrastructure.Models;
using infrastructure.Utilities;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using wms.infrastructure.Helpers;
using wms.web.Configs;

namespace wms.web.Helpers
{
    public class ApiHelper : IApiHelper
    {
        private readonly HttpClient _client;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private UserPrincipal _currentUser;
        public static DateTime _expiryToken = DateTime.Now;

        public ApiHelper(HttpClient client, IHttpContextAccessor httpContextAccessor)
        {
            _client = client;
            _httpContextAccessor = httpContextAccessor;
        }

        private void Init()
        {
            if (_currentUser == null && _httpContextAccessor.HttpContext.Session.GetString(SessionKeys.UserPricinpal) != null)
            {
                _currentUser = SessionHelper.Get<UserPrincipal>(_httpContextAccessor.HttpContext.Session, SessionKeys.UserPricinpal);
            }

            if (_currentUser != null && !string.IsNullOrEmpty(_currentUser.AccessToken))
            {
                _client.SetBearerToken(_currentUser.AccessToken);
            }

            if (!_client.DefaultRequestHeaders.Contains(HeaderKeys.UserID))
            {
                _client.DefaultRequestHeaders.Add(HeaderKeys.UserID, _currentUser.UserID.ToString());
            }

            if (_httpContextAccessor.HttpContext.Request.Headers.ContainsKey(HeaderKeys.ContextID) && !_client.DefaultRequestHeaders.Contains(HeaderKeys.ContextID))
            {
                _client.DefaultRequestHeaders.Add(HeaderKeys.ContextID, _httpContextAccessor.HttpContext.Request.Headers[HeaderKeys.ContextID].ToString());
            }

            if (!_client.DefaultRequestHeaders.Contains(HeaderKeys.SessionID))
            {
                _client.DefaultRequestHeaders.Add(HeaderKeys.SessionID, _httpContextAccessor.HttpContext.Session.Id);
            }

            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<T> ReadAllAsync<T>(string url, string cacheKey, bool IsReadOnlyCache = true, bool isMemoryCache = false)
        {

            url = url.ToUrl();
            return await GetAsync<T>(url);
        }

        public async Task<T> GetAsync<T>(string url, object? obj = null, string? token = null)
        {
            var query = obj != null ? obj.ToQueryString() : string.Empty;
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Get, url + query, token);

            return await GetResources<T>(requestMessage, query);
        }

        public async Task<T> GetAsync<T>(string url, IDictionary<string, object> dict)
        {
            var query = dict.ToQueryString();
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Get, url + query);

            return await GetResources<T>(requestMessage, query);
        }

        public async Task<T> PostAsync<T>(string url, object? obj = null, string? token = null)
        {
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Post, url, token);

            var objRequest = JsonConvert.SerializeObject(obj, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            requestMessage.Content = new StringContent(objRequest, Encoding.UTF8, "application/json");

            return await GetResources<T>(requestMessage, obj);
        }

        public async Task<T> PostFileAsync<T>(string url, MultipartFormDataContent formDataContent)
        {
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Post, url);
            requestMessage.Content = formDataContent;

            return await GetResources<T>(requestMessage);
        }

        public async Task<T> DeleteAsync<T>(string url, object? obj = null)
        {
            var query = obj != null ? obj.ToQueryString() : string.Empty;
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Delete, url + query);

            return await GetResources<T>(requestMessage, obj);
        }

        public async Task<T> PutAsync<T>(string url, object? obj = null)
        {
            var requestMessage = await GetHttpRequestMessage(HttpMethod.Put, url);

            var objRequest = JsonConvert.SerializeObject(obj, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            requestMessage.Content = new StringContent(objRequest, Encoding.UTF8, "application/json");

            return await GetResources<T>(requestMessage, obj);
        }

        public async Task<T> ForwardAsync<T>(string path, HttpMethod method, object? obj = null)
        {
            var apiUrl = AppConfig.URLConnection.APIUrl + path;
            string cacheKey = string.Empty;

            var apiEndpoint = AppConfig.UrlDataProvider?.FindMatchingEndpoint(path, method);

            if (apiEndpoint != null)
            {
                apiUrl = $"{apiEndpoint.BaseUrl}{path}";
                cacheKey = apiEndpoint.CacheKey;
            }

            if (method == HttpMethod.Get)
            {
                if (!string.IsNullOrEmpty(cacheKey))
                {
                    return await ReadAllAsync<T>(apiUrl, cacheKey, false, true);
                }
                return await GetAsync<T>(apiUrl, obj);
            }
            else if (method == HttpMethod.Post)
            {
                return await PostAsync<T>(apiUrl, obj);
            }
            else if (method == HttpMethod.Put)
            {
                return await PutAsync<T>(apiUrl, obj);
            }
            else if (method == HttpMethod.Delete)
            {
                return await DeleteAsync<T>(apiUrl, obj);
            }
            else
            {
                throw new NotSupportedException($"HTTP method '{method}' is not supported.");
            }
        }

        #region Private Functions

        private async Task<HttpRequestMessage> GetHttpRequestMessage(HttpMethod method, string url, string? token = null)
        {
            Init();
            var request = new HttpRequestMessage(method, url);
            return request;
        }

        private async Task<T> GetResources<T>(HttpRequestMessage requestMessage, object? obj = null)
        {
            try
            {
                using (var response = await _client.SendAsync(requestMessage))
                {
                    // Xử lý lỗi từ mã trạng thái HTTP
                    if (!response.IsSuccessStatusCode)
                    {
                        SetErrorAPI<T>(response.Content, (int)response.StatusCode, requestMessage.RequestUri.AbsoluteUri, obj);
                        response.EnsureSuccessStatusCode(); // Ném ngoại lệ nếu mã trạng thái không thành công
                    }

                    var responseData = await response.Content.ReadAsStringAsync();

                    try
                    {
                        // Deserializing nội dung JSON
                        return JsonConvert.DeserializeObject<T>(responseData)
                            ?? throw new JsonSerializationException("Deserialization returned null.");
                    }
                    catch (JsonSerializationException jsonException)
                    {
                        // Xử lý lỗi liên quan đến deserialization
                        throw new ApplicationException("An error occurred while deserializing the response data.", jsonException);
                    }
                }
            }
            catch (HttpRequestException httpRequestException)
            {
                // Xử lý lỗi liên quan đến HTTP
                throw new ApplicationException("An error occurred while sending the HTTP request.", httpRequestException);
            }
            catch (Exception ex)
            {
                // Xử lý các lỗi khác
                throw new ApplicationException("An unexpected error occurred.", ex);
            }
        }


        private void SetErrorAPI<T>(HttpContent content, int statusCode, string endpoint, object? obj = null)
        {

            if (statusCode == 200 || statusCode == 201)
            {
                return;
            }

            string messageError = string.Empty;

            switch (statusCode)
            {
                case 400:
                    messageError = StatusDefineMessage.Get(statusCode);
                    break;
                case 406:
                    messageError = ReadErrorData<string>(content);
                    break;
                case 500:
                    messageError = ReadErrorData<string>(content);
                    break;
                case 204:
                    messageError = Constants.MESS_NOTFOUND;
                    break;
                default:
                    messageError = StatusDefineMessage.Get(statusCode);
                    break;
            }

            throw new Exception(messageError);
        }

        private string ReadErrorData<T>(HttpContent content)
        {
            try
            {
                var data = content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<CRUDResult<T>>(data).ErrorMessage;
            }
            catch (JsonException)
            {
                return "Error parsing the error response";
            }
        }

        #endregion

        #region Dispose
        private bool _disposedValue;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    _client.Dispose();
                }
                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~ApiHelper()
        {
            Dispose(false);
        }
        #endregion
    }

    public static class StatusDefineMessage
    {
        public static string Success = "Success";
        public static string Error = "Error";
        public static string Warning = "Warning";
        public static string Info = "Info";

        public static IDictionary<int, string> StatusCode = new Dictionary<int, string>(){
            { 204,  "Không có dữ liệu"},
            { 205,  "Dữ liệu yêu cầu không hợp lệ"},
            { 400,  "Dữ liệu không hợp lệ"},
            { 401,  "Hết phiên đăng nhập, bạn vui lòng đăng nhập lại"},
            { 403,  "Bạn không có quyền thực hiện thao tác này"},
            { 404,  "Không tìm thấy tài nguyên"},
            { 405,  "Sai phương thức của tài nguyên"},
            { 406,  "Dữ liệu không hợp lệ"},
            { 500,  "Lỗi hệ thống"},
            { 502,  "Đường truyền kém"},
            { 503,  "Dịch vụ ngưng hoạt động"},
            { 504,  "Hết thời gian chờ"}
        };

        public static string Get(int code)
        {
            if (StatusCode.ContainsKey(code))
            {
                return StatusCode[code];
            }

            return "Chưa xác định";
        }
    }
}