import { Injectable } from '@angular/core';
import { UserPrincipal } from '../models/user-principal.model'
import { StorageService } from './storage.service';
import { URL_CONSTANTS } from '~src/app/config/url.constants';
import { ApiService } from '~src/app/services/api.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
  private baseUrl: string;
  private _user: UserPrincipal | null;

  private isReLogin: boolean = false;

  getIsReLogin(): boolean {
    return this.isReLogin;
  }

  setIsReLogin(value: boolean): void {
    this.isReLogin = value;
  }

  constructor(
    private _apiService: ApiService,
    private _storageService: StorageService
  ) {
    this.baseUrl = URL_CONSTANTS.accounts;
  }

  async isAuthenticated(): Promise<boolean> {
    var isValidSession = await this.isValidSession();
    if (!isValidSession) {
      this._storageService.removeUser();
      return false;
    }
    return true;
  }

  async isValidSession(): Promise<boolean> {

    try {
      let response = await this._apiService.post<UserPrincipal>(`${this.baseUrl}/checkLogin`, null).toPromise();

      const user = response as UserPrincipal;
      if (user == null || user == undefined || user.UserID <= 0) {
        return false;
      }

      this._user = user;
      this._storageService.saveUser(this._user);
      return true;
    }
    catch (err) {
      console.log('error:', err);
      return false;
    }
  }

  getCurrentUser() {
    var currentUser = this._storageService.getUser();
    return currentUser;
  }

  hasPermission(roleFunctionName: string): boolean {
    var currentUser = this._storageService.getUser();
    const user = currentUser as UserPrincipal;
    if (user == null)
      return false;
    return user.UserPermission?.map(x => x.RoleFunctionName).includes(roleFunctionName);
  }

  login(returnUrl) {
    try {
      this._apiService.get(`${this.baseUrl}/login?returnUrl=${returnUrl}`)
        .subscribe({
          next: (url: string) => {
            window.location.href = url;
            return;
          },
          error: err => {
            console.log('err:', err);
          }
        });
    }
    catch (err) {
      console.log('error:', err);
    }
    return;
  }

  logout(): boolean {
    try {
      this._apiService.post(`${this.baseUrl}/logout`)
        .subscribe({
          next: async (url: string) => {
            this._storageService.removeUser();
            window.location.href = url;

            return true;
          },
          error: err => {
            console.log('err:', err);
          }
        });

      return true;
    }
    catch (err) {
      console.log('error:', err);
      return false;
    }
  }
}

export class SessionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SessionValidationError';
  }
}

