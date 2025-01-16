namespace wms.web.Helpers
{
    public interface IApiHelper : IDisposable
    {
        Task<T> ReadAllAsync<T>(string url, string cacheKey, bool IsReadOnlyCache = false, bool isMemoryCache = false);
        Task<T> GetAsync<T>(string url, object? obj = null, string? token = null);
        Task<T> PostAsync<T>(string url, object? obj = null, string? token = null);
        Task<T> PostFileAsync<T>(string url, MultipartFormDataContent formDataContent);
        Task<T> DeleteAsync<T>(string url, object? obj = null);
        Task<T> PutAsync<T>(string url, object? obj = null);
        Task<T> ForwardAsync<T>(string url, HttpMethod method, object? obj = null);
    }
}
