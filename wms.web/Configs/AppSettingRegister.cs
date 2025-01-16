
namespace wms.web.Configs
{
    public static class AppSettingRegister
    {
        public static void Binding(IConfiguration configuration)
        {
            AppConfig.Common = new CommonConfig();
            configuration.Bind("CommonConfig", AppConfig.Common);

            AppConfig.URLConnection = new URLConnectionConfig();
            configuration.Bind("URLConnectionConfig", AppConfig.URLConnection);

            AppConfig.Oauth2 = new Oauth2Config();
            configuration.Bind("Oauth2Config", AppConfig.Oauth2);

            AppConfig.JWT = new JWTConfig();
            configuration.Bind("JWTConfig", AppConfig.JWT);
        }
    }
}
