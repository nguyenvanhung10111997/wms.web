export class AppUserPrincipal {
    customer_id: number;
    customer_uid: string;
    username: string;
    customer_name: string;
    avatar_url: string;
    gender: number;
  
    constructor(currentUser: AppUserPrincipal) {
      if (currentUser !== null) {
        this.customer_id = currentUser.customer_id;
        this.customer_uid = currentUser.customer_uid;
        this.username = currentUser.username;
        this.customer_name = currentUser.customer_name;
        this.avatar_url = currentUser.avatar_url;
        this.gender = currentUser.gender;
      }
    }
  }
  
  class PermissionRes {
    RoleID: number;
    RoleFunctionName: string;
  }
  
  class ModuleRes {
    ModuleName: string;
    ModuleLink: string;
  }
  