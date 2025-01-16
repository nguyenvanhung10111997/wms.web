export class UserPrincipal {
    Username: string;
    FullName: string;
    ExpiryDate: Date;
    UserID: number;
    UserTypeID: number;
    Gender: number;
    Avatar: string;
    UserPermission: PermissionRes[];
  
    constructor(currentUser: UserPrincipal) {
      if (currentUser !== null) {
        this.Username = currentUser.Username;
        this.FullName = currentUser.FullName;
        this.ExpiryDate = currentUser.ExpiryDate;
        this.UserID = currentUser.UserID;
        this.UserTypeID = currentUser.UserTypeID;
        this.Gender = currentUser.Gender;
        this.Avatar = currentUser.Avatar;
        this.UserPermission = currentUser.UserPermission;
      }
    }
  }
  
  class PermissionRes {
    RoleID: number;
    RoleFunctionName: string;
  }
  