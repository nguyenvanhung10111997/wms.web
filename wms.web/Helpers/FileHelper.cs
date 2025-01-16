using wms.web.Models.Files;

namespace wms.web.Helpers
{

    public class FileHelper : IFileHelper
    {
        private readonly string _wwwroot = "wwwroot";
        public FileHelper()
        {
        }
        public async Task<FileUploadRes> Upload(MultipartFormDataContent formData, string rootPath = "uploads")
        {
            var file = formData.FirstOrDefault(c => c.Headers.ContentDisposition.Name.Trim('"') == "file");

            if (file == null)
            {
                throw new ArgumentException("No file found in the form data");
            }

            var fileName = file.Headers.ContentDisposition.FileName.Trim('"');
            var filePath = Path.Combine(rootPath, fileName);

            // Kiểm tra và tạo tên file duy nhất nếu file đã tồn tại
            filePath = GetUniqueFilePath(filePath);

            try
            {
                // Tạo thư mục nếu chưa tồn tại
                var directoryPath = _wwwroot + "//" + Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // Lưu file vào thư mục
                using (var stream = await file.ReadAsStreamAsync())
                using (var fileStream = new FileStream(_wwwroot + "//" + filePath, FileMode.Create, FileAccess.Write))
                {
                    await stream.CopyToAsync(fileStream);
                }

                return new FileUploadRes
                {
                    Success = true,
                    Message = "File uploaded successfully",
                    FilePath = filePath,
                    FileName = filePath.Split("\\").Last()
                };
            }
            catch (Exception ex)
            {
                return new FileUploadRes
                {
                    Success = false,
                    Message = $"Error uploading file: {ex.Message}"
                };
            }
        }

        private string GetUniqueFilePath(string filePath)
        {
            var directory = Path.GetDirectoryName(filePath);
            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(filePath);
            var extension = Path.GetExtension(filePath);

            int counter = 1;
            string uniqueFilePath = filePath;

            while (File.Exists(_wwwroot + "//" + uniqueFilePath))
            {
                uniqueFilePath = Path.Combine(directory, $"{fileNameWithoutExtension}({counter++}){extension}");
            }

            return uniqueFilePath;
        }
    }
}
