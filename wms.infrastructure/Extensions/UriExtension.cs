namespace infrastructure.Utilities
{
    public static class UriExtension
    {
        public static string ToUrl(this string url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return string.Empty;
            }

            if (!string.IsNullOrEmpty(url) && url.EndsWith("/"))
            {
                url = url.Remove(url.Length - 1, 1);
            }

            return url;
        }
    }
}
