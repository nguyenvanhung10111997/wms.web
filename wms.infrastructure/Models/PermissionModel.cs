namespace wms.infrastructure.Models
{
    public class PermissionModel
    {
        public int RoleID { get; set; }
        public string PermissionID { get; set; }
        public string APIController { get; set; }
        public string APIAction { get; set; }
        public string APIMethod { get; set; }
    }
}
