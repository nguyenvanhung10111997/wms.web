using infrastructure.Models;
using wms.infrastructure.Models;

namespace wms.web.Models
{
    public class UserLoginModel
    {
        public int UserID { get; set; }

        public string Username { get; set; }

        public int? UserTypeID { get; set; }

        public string FullName { get; set; }

        public DateTime ExpiryDate { get; set; }

        public IEnumerable<int> RoleIDs { get; set; }

        public List<PermissionModel> UserPermissions { get; set; }

        public UserLoginModel(UserPrincipal currentUser)
        {
            if (currentUser != null)
            {
                Username = currentUser.Username;
                FullName = currentUser.FullName;
                ExpiryDate = currentUser.ExpiryDate;
                UserID = currentUser.UserID;
                UserTypeID = currentUser.UserTypeID;
                UserPermissions = currentUser.UserPermissions;
            }
        }
    }
}
