import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import { IOrderByIDRes } from "./models";
import {
  OrderCreateReq,
  OrderUpdateQuantityReq,
  OrderUpdateReq,
  SearchMetricseReq
} from "./models/request/orders.req";
import { SearchMetricsRes } from "./models/response/order.res";
import { OrderUpdateStatusReq } from "./models/request/update-status";

@Injectable()
export class OrdersService extends BaseService {
  url = URL_CONSTANTS.orders;

  public readOrderByLineID(lineId: number): Observable<IOrderByIDRes> {
    return this._apiService.get<IOrderByIDRes>(`${this.url}/line/${lineId}`);
  }

  public create(obj: OrderCreateReq): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/create`, obj);
  }

  public update(obj: OrderUpdateReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/update`, obj);
  }

  public updateQuantity(obj: OrderUpdateQuantityReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/updatequantity`, obj);
  }

  public searchMetrics(obj: SearchMetricseReq): Observable<SearchMetricsRes> {
    return this._apiService.post<SearchMetricsRes>(
      `${this.url}/metrics/search`,
      obj
    );
  }

  public updateStatus(obj: OrderUpdateStatusReq): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}/updateStatus`, obj);
  }
}
