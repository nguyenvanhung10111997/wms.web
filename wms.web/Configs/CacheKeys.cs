using System.Reflection;
using System.Text;

namespace wms.web.Configs
{
    public class CacheKeys
    {
        public static string GenerateKey(object obj)
        {
            if (obj == null)
            {
                throw new ArgumentNullException(nameof(obj));
            }

            Type type = obj.GetType();
            PropertyInfo[] properties = type.GetProperties();

            StringBuilder keyBuilder = new StringBuilder($"?");

            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var value = property.GetValue(obj);
                keyBuilder.Append($"{propertyName}=");

                if (value != null)
                {
                    keyBuilder.Append(value.ToString());
                }
                else
                {
                    keyBuilder.Append("null");
                }

                keyBuilder.Append("&");
            }

            return keyBuilder.ToString().TrimEnd('&');
        }

        public const string Category = "cms.category";
        public const string Post = "cms.post";
    }

}
