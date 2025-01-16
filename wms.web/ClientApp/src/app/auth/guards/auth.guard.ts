import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard  {
  constructor(
    private router: Router,
    private readonly _authService: AuthService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    const requiredPermission = route.data.permission as string;
    var returnUrl = window.document.URL;
    var isAuthenticated = await this._authService.isAuthenticated();

    if (isAuthenticated) {
      this._authService.setIsReLogin(true);

    //   const hasPermission = this._authService.hasPermission(requiredPermission);
      
    //   if (!hasPermission) {
    //     this.router.navigate(['page-403'], { skipLocationChange: true });
    //     return false;
    //   }
      return true;
    }

    await this._authService.login(returnUrl);
    return true;
  }
}
