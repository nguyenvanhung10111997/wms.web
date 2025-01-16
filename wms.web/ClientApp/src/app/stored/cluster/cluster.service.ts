import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import { ClusterCreateReq, ClusterRes, ClusterUpdateReq } from "./models";
@Injectable()
export class ClusterService extends BaseService {
  url = URL_CONSTANTS.clusters;

  public getAll(): Observable<ClusterRes[]> {
    return this._apiService.get<ClusterRes[]>(`${this.url}`);
  }
  public create(obj: ClusterCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }
  public update(obj: ClusterUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }
  public delete(Id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this.url}`, Id.toString());
  }
}
