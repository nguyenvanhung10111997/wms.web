import { Injectable } from "@angular/core";
import { URL_CONSTANTS } from "src/app/config/url.constants";
import { Observable } from "rxjs";
import { BaseService } from "~src/app/services/base.service";
import {
  LineClusterProductSearchMetricReq,
  LineClusterProductSearchMetricRes,
  LineClusterProductSearchReq,
  LineClusterProductSearchRes
} from "./models";
import { PagingResponse } from "~src/app/core/interfaces/paging.res";
import { LineClusterProductCreateReq } from "./models/request/line-cluster-product-create.req";
import { LineClusterProductUpdateReq } from "./models/request/line-cluster-product-update.req";
@Injectable()
export class LineClusterProductService extends BaseService {
  url = URL_CONSTANTS.lineClusterProducts;

  public search(
    req: LineClusterProductSearchReq
  ): Observable<PagingResponse<LineClusterProductSearchRes>> {
    return this._apiService.post<PagingResponse<LineClusterProductSearchRes>>(
      `${this.url}/search`,
      req
    );
  }

  public create(
    req: LineClusterProductCreateReq
  ): Observable<boolean> {
    return this._apiService.post<boolean>(
      `${this.url}/create`,
      req
    );
  }

  public update(
    req: LineClusterProductUpdateReq
  ): Observable<boolean> {
    return this._apiService.put<boolean>(
      `${this.url}/update`,
      req
    );
  }

  public searchMetrics(
    req: LineClusterProductSearchMetricReq
  ): Observable<PagingResponse<LineClusterProductSearchMetricRes>> {
    return this._apiService.post<
      PagingResponse<LineClusterProductSearchMetricRes>
    >(`${this.url}/metrics/search`, req);
  }
}
