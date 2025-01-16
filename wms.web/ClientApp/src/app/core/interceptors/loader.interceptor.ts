import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderIntercept implements HttpInterceptor {

  totalRequests = 0;
  requestsCompleted = 0;

  constructor() { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    //this.loader.show();
    this.totalRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.requestsCompleted++;
        if (this.requestsCompleted === this.totalRequests) {
          //this.loader.hide();
          this.totalRequests = 0;
          this.requestsCompleted = 0;
        }
      })
    );
  }
}
