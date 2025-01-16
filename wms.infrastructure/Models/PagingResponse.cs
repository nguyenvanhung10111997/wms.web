using Newtonsoft.Json;
using infrastructure.Enums;

namespace infrastructure.Models
{
    public class PagingResponse<T>
    {
        [JsonIgnore]
        public CRUDStatusCodeRes StatusCode { get; set; }

        [JsonIgnore]
        public string ErrorMessage { get; set; }

        public int TotalRecord { get; set; }

        public int? PageIndex { get; set; }

        public int? PageSize { get; set; }

        public IEnumerable<T> Records { get; set; }
    }
}
