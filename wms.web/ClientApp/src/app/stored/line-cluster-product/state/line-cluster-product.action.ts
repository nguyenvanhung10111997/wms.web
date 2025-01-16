import { Action } from "@ngrx/store";
import {
  LineClusterProductSearchMetricReq,
  LineClusterProductSearchMetricRes,
  LineClusterProductSearchReq,
  LineClusterProductSearchRes
} from "../models";
import { PagingResponse } from "~src/app/core/interfaces/paging.res";
import { LineClusterProductCreateReq } from "../models/request/line-cluster-product-create.req";
import { LineClusterProductUpdateReq } from "../models/request/line-cluster-product-update.req";

export const LINE_CLUSTER_PRODUCT_ACTIONS = {
  RESET_ACTION: "[LINE_CLUSTER_PRODUCT] RESET_ACTION",

  READ_CLUSTER: "[LINE_CLUSTER_PRODUCT] READ_CLUSTER",
  READ_CLUSTER_ERROR: "[LINE_CLUSTER_PRODUCT] READ_CLUSTER_ERROR",
  READ_CLUSTER_SUCCESS: "[LINE_CLUSTER_PRODUCT] READ_CLUSTER_SUCCESS",

  CREATE: "[LINE_CLUSTER_PRODUCT] CREATE",
  CREATE_ERROR: "[LINE_CLUSTER_PRODUCT] CREATE_ERROR",
  CREATE_SUCCESS: "[LINE_CLUSTER_PRODUCT] CREATE_SUCCESS",

  UPDATE: "[LINE_CLUSTER_PRODUCT] UPDATE",
  UPDATE_ERROR: "[LINE_CLUSTER_PRODUCT] UPDATE_ERROR",
  UPDATE_SUCCESS: "[LINE_CLUSTER_PRODUCT] UPDATE_SUCCESS",

  SEARCH: "[LINE_CLUSTER_PRODUCT] SEARCH",
  SEARCH_ERROR: "[LINE_CLUSTER_PRODUCT] SEARCH_ERROR",
  SEARCH_SUCCESS: "[LINE_CLUSTER_PRODUCT] SEARCH_SUCCESS",

  SEARCH_METRIC: "[LINE_CLUSTER_PRODUCT] SEARCH_METRIC",
  SEARCH_METRIC_ERROR: "[LINE_CLUSTER_PRODUCT] SEARCH_METRIC_ERROR",
  SEARCH_METRIC_SUCCESS: "[LINE_CLUSTER_PRODUCT] SEARCH_METRIC_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region Search
export class SearchAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH;
  constructor(
    public payload: { param: LineClusterProductSearchReq; source: string }
  ) {}
}

export class SearchSuccessAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_SUCCESS;
  constructor(
    public payload: {
      data: PagingResponse<LineClusterProductSearchRes>;
      source?: string;
    }
  ) {}
}

export class SearchErrorAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Search

//#region Create
export class CreateAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.CREATE;
  constructor(public payload: { param: LineClusterProductCreateReq }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { status: boolean }) {}
}

export class CreateErrorAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE;
  constructor(public payload: { param: LineClusterProductUpdateReq }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { status: boolean }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error }) {}
}
//#endregion Update

//#region SearchMetrics
export class SearchMetricAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC;
  constructor(
    public payload: { param: LineClusterProductSearchMetricReq; source: string }
  ) {}
}

export class SearchMetricSuccessAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC_SUCCESS;
  constructor(
    public payload: {
      data: PagingResponse<LineClusterProductSearchMetricRes>;
      source?: string;
    }
  ) {}
}

export class SearchMetricErrorAction implements Action {
  readonly type = LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion SearchMetrics
