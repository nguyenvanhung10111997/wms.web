using System.Security.Claims;
using System.Text.Json.Serialization;
using wms.infrastructure.Extensions;
using wms.infrastructure.Models;

namespace infrastructure.Models
{
    public class UserPrincipal : ClaimsPrincipal
    {
        public int UserID { get; set; }

        public string Username { get; set; }

        public int? UserTypeID { get; set; }

        public string FullName { get; set; }

        public IEnumerable<int> RoleIDs { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public DateTime ExpiryDate { get; set; }

        public List<PermissionModel> UserPermissions { get; set; }

        public UserPrincipal()
        {
        }

        public UserPrincipal(string token, string refreshToken, List<Claim> claims)
        {
            AccessToken = token;
            RefreshToken = refreshToken;
            var unixTimeStamp = double.Parse(claims.Where((Claim p) => p.Type == "exp").First().Value);
            ExpiryDate = unixTimeStamp.UnixTimeStampToDateTime();

            UserID = (claims.Any((Claim x) => x.Type == "/UserID") ? int.Parse(claims.FirstOrDefault((Claim p) => p.Type == "/UserID")!.Value) : 0);
            Username = (claims.Any((Claim x) => x.Type == "/Username") ? claims.FirstOrDefault((Claim p) => p.Type == "/Username")!.Value : string.Empty);
            FullName = (claims.Any((Claim x) => x.Type == "/FullName") ? claims.FirstOrDefault((Claim p) => p.Type == "/FullName")!.Value : string.Empty);
            UserTypeID = (claims.Any((Claim x) => x.Type == "/UserTypeID") ? int.Parse(claims.FirstOrDefault((Claim p) => p.Type == "/UserTypeID")!.Value) : 0);

            var claim = (claims.Any((Claim x) => x.Type == "/RoleIDs") ? claims.FirstOrDefault((Claim p) => p.Type == "/RoleIDs") : null);

            if (claim != null)
            {
                RoleIDs = from i in claim.Value.Replace("[", "").Replace("]", "").Split(',')
                          select Convert.ToInt32(i);
            }
        }

        public bool IsPermission(string roleFunctionName)
        {
            if (string.IsNullOrWhiteSpace(roleFunctionName) || RoleIDs == null || !RoleIDs.Any())
            {
                return false;
            }

            return true;
            //return AppPermission.Data.Where((Permission r) => RoleIDs.Contains(r.RoleID) && r.RoleFunctionName == roleFunctionName).Any();
        }
    }
}
