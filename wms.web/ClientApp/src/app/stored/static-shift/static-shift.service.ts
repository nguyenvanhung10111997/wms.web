import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import {
  StaticShiftCreateReq,
  StaticShiftRes,
  StaticShiftUpdateReq
} from "./models";
@Injectable()
export class StaticShiftService extends BaseService {
  url = URL_CONSTANTS.staticShifts;

  public getAll(): Observable<StaticShiftRes[]> {
    return this._apiService.get<StaticShiftRes[]>(`${this.url}`);
  }
  public create(obj: StaticShiftCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }
  public update(obj: StaticShiftUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }
  public delete(lineId: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this.url}`, lineId.toString());
  }
}
