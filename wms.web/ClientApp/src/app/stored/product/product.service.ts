import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import { ProductCreateReq, ProductRes, ProductUpdateReq } from "./models";
@Injectable()
export class ProductService extends BaseService {
  url = URL_CONSTANTS.products;

  public getAll(): Observable<ProductRes[]> {
    return this._apiService.get<ProductRes[]>(`${this.url}`);
  }
  public create(obj: ProductCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }
  public update(obj: ProductUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }
  public delete(Id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this.url}`, Id.toString());
  }
}
