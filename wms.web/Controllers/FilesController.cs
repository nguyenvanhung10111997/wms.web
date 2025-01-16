using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using wms.web.Configs;
using wms.web.Helpers;

namespace wms.web.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/files")]
    public class FilesController : BaseController
    {
        private readonly IFileHelper _fileHelper;

        public FilesController(
            IFileHelper fileHelper) : base()
        {
            _fileHelper = fileHelper;
        }


        [HttpPost("upload")]
        public async Task<JsonResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return Error("File không hợp lệ.");
            }

            try
            {
                var fileName = file.FileName;
                using var stream = file.OpenReadStream();
                var multiContent = new MultipartFormDataContent();
                multiContent.Add(new StreamContent(stream), "file", fileName);

                var result = await _fileHelper.Upload(multiContent, AppConfig.Common.PathUpload);
                return Success<object>(result);
            }
            catch (Exception ex)
            {
                return Error($"Đã xảy ra lỗi khi tải lên: {ex.Message}");
            }
        }

    }
}
