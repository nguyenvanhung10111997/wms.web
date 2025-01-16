import { Inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { DOCUMENT } from "@angular/common";

@Injectable({ providedIn: "root" })
export class FileService {
  baseUrl = "/api/files";
  constructor(
    private _apiService: ApiService,
    private _http: HttpClient,
    private _loader: LoaderService,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  attachFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest("POST", `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: "json"
    });
    return this._http.request(req);
  }

  attachFilePromise(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.baseUrl}/attachFile`,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );
    return this._http.request(req).toPromise();
  }

  getSignedLink(filePath: string): Observable<any> {
    return this._apiService.post(
      `${this.baseUrl}/getSignedLink?filePath=${filePath}`
    );
  }

  uploadExcel(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.baseUrl}/uploadExcel`,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );
    return this._http.request(req);
  }

  downloadExcel(filePath: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("filePath", filePath);
    return this._http.post(`${this.baseUrl}/downloadExcel`, formData, {
      responseType: "blob"
    });
  }
}
