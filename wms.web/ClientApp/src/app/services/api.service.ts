import { Inject, Injectable, PLATFORM_ID, inject } from "@angular/core";
import { catchError, filter, map, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";
import { throwError, Observable, of } from "rxjs";
import { environment } from "~src/environments/environment";
import { isPlatformBrowser } from "@angular/common";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  isBrowser: boolean;
  private _router = inject(Router);
  private _http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.sendRequest<T>("get", url, null, params);
  }

  getById<T>(url: string, id: number): Observable<T> {
    return this.sendRequest<T>("get", `${url}/${id}`);
  }

  delete<T>(url: string, id: string): Observable<T> {
    return this.sendRequest<T>("delete", `${url}/${id}`);
  }

  put<T>(url: string, value: any): Observable<T> {
    return this.sendRequest<T>("put", url, value);
  }

  post<T>(url: string, value?: any): Observable<T> {
    return this.sendRequest<T>("post", url, value);
  }

  postFile<T>(url: string, file: File, value?: any): Observable<T> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    if (value) {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          formData.append(key, value[key]);
        }
      }
    }
    const req = new HttpRequest("POST", url, formData, {
      reportProgress: true,
      responseType: "json"
    });
    //return this._http.request(req);
    return this._http.request<CRUDResult>(req).pipe(
      filter(
        (event: HttpEvent<CRUDResult>) => event.type === HttpEventType.Response
      ),
      map(
        (response: HttpResponse<CRUDResult>) => response.body as CRUDResult
      ),
      tap((apiResponse: CRUDResult) => {
        if (apiResponse.StatusCode !== 0 || apiResponse.ErrorMessage !== null) {
          throw apiResponse
        }
      }),
      map((apiResponse: CRUDResult) => apiResponse.Data as T),
      catchError((error: any) => {
        if (!environment.production) {
          console.log("There was an error!", error);
        }
        return throwError(error); // Ném ra lỗi để xử lý trong component
      })
    );
  }

  private sendRequest<T>(
    method: string,
    url: string,
    data: any | null = null,
    params?: HttpParams
  ): Observable<T> {
    const requestOptions: HttpRequest<CRUDResult> = new HttpRequest(
      method,
      url,
      data,
      {
        headers: this.setHeaders(),
        params: params,
        withCredentials: true,
        responseType: "json" // Set responseType to 'json' to parse the response as JSON
      }
    );

    return this._http.request<CRUDResult>(requestOptions).pipe(
      filter(
        (event: HttpEvent<CRUDResult>) =>
          event && event.type === HttpEventType.Response
      ),
      map(
        (response: HttpResponse<CRUDResult>) => response.body as CRUDResult
      ),
      tap((apiResponse: CRUDResult) => {
        if (apiResponse.StatusCode !== 0 || apiResponse.ErrorMessage !== "") {
          throw apiResponse
        }
      }),
      map((apiResponse: CRUDResult) => {
        return apiResponse.Data as T;
      }),
      catchError((error: any) => {
        if (!environment.production) {
          console.log("There was an error!", error);
        }
        return throwError(error); // Ném ra lỗi để xử lý trong component
      })
    );
  }
  

  private setHeaders = () => {
    let headers = new HttpHeaders();
    headers = headers.set("platform", "1");
    return headers;
  };

  public objectToQueryString(obj: { [key: string]: any }): string {
    const queryParams = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        if (obj[key] != null) {
          const value = encodeURIComponent(obj[key]);
          queryParams.push(`${encodeURIComponent(key)}=${value}`);
        }
      }
    }

    return queryParams.join("&");
  }

  generateUUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid.replace(/-/g, "");
  }
}


export class CRUDResult {
  StatusCode: number;
  ErrorMessage: string;
  Data: any;
}
