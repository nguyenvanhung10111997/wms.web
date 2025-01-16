namespace wms.web.Configs
{
    public static class AppConfig
    {
        public static CommonConfig Common { get; set; }
        public static URLConnectionConfig URLConnection { get; set; }
        public static UrlConfigDataProvider UrlDataProvider { get; set; }
        public static Oauth2Config Oauth2 { get; set; }
        public static JWTConfig JWT { get; set; }
    }

    public class CommonConfig
    {
        public string Environment { get; set; }
        public string ClientName { get; set; }
        public int AppCacheTime { get; set; } = 1;
        public string PathUpload { get; set; }
        public string SPARootPath { get; set; }
    }

    public class URLConnectionConfig
    {
        public string ClientUrl { get; set; }
        public string APIUrl { get; set; }
        public string IDSUrl { get; set; }
    }

    public class Oauth2Config
    {
        public string ClientID { get; set; }
        public string Scope { get; set; }
        public string Secret { get; set; }
    }

    public class JWTConfig
    {
        public string Base64PublicKey { get; set; }
        public string Issuer { get; set; }
    }
}

