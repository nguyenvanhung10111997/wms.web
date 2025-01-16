import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as uuid from 'uuid';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {

  isShowConfirm: boolean = false;
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      headers: this.setHeaders() // Thêm headers vào yêu cầu
    });
    return next.handle(req).pipe(
      tap(
        response => {
          if (response instanceof HttpResponse) {
            if (response && response.body
              && response.body.CodeStep
              && response.body.CodeStep.Status == 'Error'
              && response.body.CodeStep.HTTPStatusCode == 401) {
              if (!this._authService.getIsReLogin()) {
                window.location.href = response.body.CodeStep.Data;
              }
              this.confirmReLogin();
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            const respError = error as HttpErrorResponse;
            if (respError.status === 403) {
              this._router.navigate(['/unauthorized']);
            }
            else if (respError.status === 401) {
              let returnUrl = window.location.href;
              this._authService.login(returnUrl);
            }
          }
        }
      )
    );
  }

  private setHeaders = () => {
    let headers = new HttpHeaders();
    headers = headers.set('ContextID', uuid.v4().toString().replace(/-/g, ''));
    headers = headers.set('returnUrl', window.location.href);
    return headers;
  }

  confirmReLogin = () => {

    if (!this._authService.getIsReLogin()) {
      return;
    }
    if (this.isShowConfirm) return;

    this.isShowConfirm = true;
    Swal.fire({
      text: 'Phiên đăng nhập hết hạn, vui lòng bấm đồng ý để đăng nhập lại',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      customClass: {
        container: 'my-swal',
      },
    }).then((result) => {
      this.isShowConfirm = false;
      if (result.value) {
        this.openReLogin();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  openReLogin = () => {
    var newwindow;
    let screenX: number = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
    let screenY: number = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
    let outerWidth: number = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth;
    let outerHeight: number = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22);
    let width = 500;
    let height = 450;
    let left = screenX + (outerWidth - width) / 2;
    let top = screenY + (outerHeight - height) / 2.5;
    let features = (
      'width=' + width +
      ',height=' + height +
      ',left=' + left +
      ',top=' + top
    );

    var returnUrl = `${window.document.baseURI}` + 'account/relogin';
    newwindow = window.open(`/accounts/relogin?returnUrl=${returnUrl}`, 'Refresh login', features);
    if (window.focus) {
      newwindow.focus();
    }

    return false;
  }
}
