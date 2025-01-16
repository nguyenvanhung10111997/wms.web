using System.Reflection;
using System.Text.RegularExpressions;

namespace wms.web.Configs
{
    public class ApiEndpoint
    {
        public HttpMethod Method { get; set; }
        public string BaseUrl { get; set; }
        public string Path { get; set; }
        public string CacheKey { get; set; }
    }

    public class CacheKeyVersion
    {
        public string CacheKey { get; set; }
        public string Version { get; set; }
        public string Path { get; set; }
    }

    public partial class UrlConfigDataProvider
    {
        public Dictionary<string, ApiEndpoint> Endpoints { get; } = new Dictionary<string, ApiEndpoint>();
        public List<CacheKeyVersion> CacheKeyVersions { get; } = new List<CacheKeyVersion>();

        public void AddEndpointsFrom(Type endpointType)
        {
            try
            {
                var endpointInstance = Activator.CreateInstance(endpointType);

                if (endpointInstance == null)
                {
                    return;
                }

                string version = InitVersion();

                var endpoints = endpointType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
                    .Where(p => typeof(ApiEndpoint).IsAssignableFrom(p.PropertyType))
                    .Select(p => (ApiEndpoint)p.GetValue(endpointInstance))
                    .Where(endpoint => endpoint != null);

                foreach (var endpoint in endpoints)
                {
                    string endpointKey = GetEndpointKey(endpoint.Method, endpoint.Path);
                    Endpoints.Add(endpointKey, endpoint);
                    if (endpoint.Method == HttpMethod.Get && !string.IsNullOrEmpty(endpoint.CacheKey))
                    {
                        CacheKeyVersions.Add(new CacheKeyVersion
                        {
                            CacheKey = endpoint.CacheKey,
                            Path = endpoint.Path,
                            Version = version
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public string GetEndpointKey(HttpMethod method, string path) => $"{method}-{path}";

        public ApiEndpoint FindMatchingEndpoint(string path, HttpMethod method)
        {
            try
            {
                foreach (var endpoint in Endpoints.Values)
                {
                    string regexPattern = Regex.Replace(endpoint.Path?.ToLower(), @"\{.*?\}", "(.*)");
                    regexPattern = Regex.Replace(regexPattern, "/", "\\/");
                    regexPattern = $"^{regexPattern}$";
                    bool matchPath = Regex.IsMatch(path?.ToLower(), regexPattern);
                    if (matchPath && endpoint.Method == method)
                    {
                        return endpoint;
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        #region CacheKeyVersionClient
        public string InitVersion() => DateTime.Now.ToString("ddMMyyyyhhmmss");

        public void UpdateVersionCacheKey(string cacheKey)
        {
            var cacheKeyVersion = CacheKeyVersions.Find(x => x.CacheKey == cacheKey);
            if (cacheKeyVersion != null)
            {
                string newVersion = InitVersion();
                cacheKeyVersion.Version = newVersion;
            }
        }

        public void UpdateAllVersionCacheKey()
        {
            string newVersion = InitVersion();
            foreach (var cacheKeyVersion in CacheKeyVersions)
            {
                cacheKeyVersion.Version = newVersion;
            }
        }

        public void SetCacheKeyFromRequest(string cacheKey, string path)
        {
            try
            {
                string version = InitVersion();
                if (!AppConfig.UrlDataProvider.CacheKeyVersions.Any(x => x.CacheKey == cacheKey))
                {
                    CacheKeyVersions.Add(new CacheKeyVersion
                    {
                        CacheKey = cacheKey,
                        Path = path,
                        Version = version
                    });
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        #endregion

    }

    public static class UrlConfigDataExtensions
    {
        public static void InitUrlDataProvider(this IApplicationBuilder app)
        {
            AppConfig.UrlDataProvider = new UrlConfigDataProvider();
        }
    }
}
