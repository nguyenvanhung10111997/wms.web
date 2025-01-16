import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import { MachinesRes } from "./models/response/machines.res";
import {
  MachinesCreateReq,
  MachinesUpdateReq
} from "./models/request/machines.req";

@Injectable()
export class MachinesService extends BaseService {
  url = URL_CONSTANTS.machines;

  public getAll(): Observable<MachinesRes[]> {
    return this._apiService.get<MachinesRes[]>(`${this.url}`);
  }
  public create(obj: MachinesCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }
  public update(obj: MachinesUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }
  public delete(machineId: number): Observable<boolean> {
    return this._apiService.delete<boolean>(
      `${this.url}`,
      machineId.toString()
    );
  }
}
