import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import {
  ILineByID,
  IStatisticRes,
  LineCreateReq,
  LineReadClusterRes,
  LineRes,
  LineUpdateReq
} from "./models";
@Injectable()
export class LineService extends BaseService {
  url = URL_CONSTANTS.lines;

  public getAll(): Observable<LineRes[]> {
    return this._apiService.get<LineRes[]>(`${this.url}`);
  }
  public readById(lineId: number): Observable<ILineByID> {
    return this._apiService.get<ILineByID>(`${this.url}/${lineId}`);
  }
  public create(obj: LineCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }
  public update(obj: LineUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }
  public delete(lineId: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this.url}`, lineId.toString());
  }
  public readClusters(lineId: number): Observable<LineReadClusterRes> {
    return this._apiService.get<LineReadClusterRes>(
      `${this.url}/${lineId}/clusters`
    );
  }

  public readStatistic(obj: {
    RequestTime: string;
  }): Observable<IStatisticRes[]> {
    return this._apiService.post<IStatisticRes[]>(
      `${this.url}/metrics/statistic`,
      obj
    );
  }
}
