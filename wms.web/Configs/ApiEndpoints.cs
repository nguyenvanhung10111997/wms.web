
using infrastructure.Utilities;

namespace wms.web.Configs
{
    public class ApiEndpoints
    {
        public static string APIBaseUrl = AppConfig.URLConnection.APIUrl.ToUrl();
        public static string ForwardResource { get { return APIBaseUrl + "/api"; } }

        #region wms-api
        public static string WeatherForecastsResource { get { return "/api/weather-forecasts"; } }
        public static string LinesResource { get { return "/api/v1/lines"; } }
        #endregion
    }

    public class WeatherForecastsEndpoints
    {
        public ApiEndpoint List { get { return new ApiEndpoint { Method = HttpMethod.Get, BaseUrl = ApiEndpoints.APIBaseUrl, Path = ApiEndpoints.WeatherForecastsResource }; } }
    }

    public class LinesEndpoints
    {
        public ApiEndpoint List { get { return new ApiEndpoint { Method = HttpMethod.Get, BaseUrl = ApiEndpoints.APIBaseUrl, Path = ApiEndpoints.LinesResource }; } }
    }

    public partial class UrlConfigDataProvider
    {
        public UrlConfigDataProvider()
        {
            AddEndpointsFrom(typeof(WeatherForecastsEndpoints));
            AddEndpointsFrom(typeof(LinesEndpoints));
        }
    }
}
