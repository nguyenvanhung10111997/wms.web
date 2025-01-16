
using wms.web.Enums;
using Microsoft.AspNetCore.Mvc;

namespace wms.web.Controllers
{
    public class BaseController : Controller
    {

        public BaseController()
        {
        }

        protected JsonResult Success<T>(T data)
        {
            return Json(new
            {
                Data = data,
                StatusCode = CRUDStatusCodeRes.Success,
                ErrorMessage = string.Empty
            });
        }

        protected JsonResult Error(Exception ex)
        {
            return Json(new
            {
                Data = string.Empty,
                StatusCode = CRUDStatusCodeRes.InvalidData,
                ErrorMessage = ex.Message
            });
        }

        protected JsonResult Error(string message)
        {
            return Json(new
            {
                Data = string.Empty,
                StatusCode = CRUDStatusCodeRes.InvalidData,
                ErrorMessage = message
            });
        }

        protected JsonResult Unauthorized(string message)
        {
            return Json(new
            {
                Data = string.Empty,
                StatusCode = CRUDStatusCodeRes.Deny,
                ErrorMessage = message
            });
        }
    }
}
