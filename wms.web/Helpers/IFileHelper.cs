using Microsoft.AspNetCore.Mvc;
using wms.web.Models.Files;

namespace wms.web.Helpers
{
    public interface IFileHelper
    {
        Task<FileUploadRes> Upload(MultipartFormDataContent formData, string? rootPath = "uploads");
    }
}
