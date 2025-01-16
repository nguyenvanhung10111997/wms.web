import { Action } from "@ngrx/store";
import { IOrderByIDRes } from "../models";
import {
  OrderCreateReq,
  OrderUpdateQuantityReq,
  OrderUpdateReq,
  SearchMetricseReq
} from "../models/request/orders.req";
import { SearchMetricsRes } from "../models/response/order.res";
import { OrderUpdateStatusReq } from "../models/request/update-status";

export const ORDERS_ACTIONS = {
  RESET_ACTION: "[ORDERS] RESET_ACTION",

  READ_ORDERS_BY_LINE_ID: "[ORDERS] READ_ORDERS_BY_LINE_ID",
  READ_ORDERS_BY_LINE_ID_ERROR: "[ORDERS] READ_ORDERS_BY_LINE_ID_ERROR",
  READ_ORDERS_BY_LINE_ID_SUCCESS: "[ORDERS] READ_ORDERS_BY_LINE_ID_SUCCESS",

  CREATE: "[ORDERS] CREATE",
  CREATE_ERROR: "[ORDERS] CREATE_ERROR",
  CREATE_SUCCESS: "[ORDERS] CREATE_SUCCESS",

  UPDATE: "[ORDERS] UPDATE",
  UPDATE_ERROR: "[ORDERS] UPDATE_ERROR",
  UPDATE_SUCCESS: "[ORDERS] UPDATE_SUCCESS",

  UPDATE_QUANTITY: "[ORDERS] UPDATE_QUANTITY",
  UPDATE_QUANTITY_ERROR: "[ORDERS] UPDATE_QUANTITY_ERROR",
  UPDATE_QUANTITY_SUCCESS: "[ORDERS] UPDATE_QUANTITY_SUCCESS",

  SEARCH_METRICS: "[ORDERS] SEARCH_METRICS",
  SEARCH_METRICS_ERROR: "[ORDERS] SEARCH_METRICS_ERROR",
  SEARCH_METRICS_SUCCESS: "[ORDERS] SEARCH_METRICS_SUCCESS",

  UPDATE_STATUS: "[ORDERS] UPDATE_STATUS",
  UPDATE_STATUS_ERROR: "[ORDERS] UPDATE_STATUS_ERROR",
  UPDATE_STATUS_SUCCESS: "[ORDERS] UPDATE_STATUS_SUCCESS",
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = ORDERS_ACTIONS.RESET_ACTION;
  constructor() {}
}

//#region GetOrdersByLineID
export class GetOrdersByLineIDAction implements Action {
  readonly type = ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID;
  constructor(public payload: { lineID: number; source: number }) {}
}

export class GetOrdersByLineIDSuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID_SUCCESS;
  constructor(
    public payload: {
      data: IOrderByIDRes;
      source: number;
    }
  ) {}
}

export class GetOrdersByLineIDErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID_ERROR;
  constructor(public payload: { error: Error; source: number }) {}
}
//#endregion GetOrdersByLineID

//#region Create
export class CreateAction implements Action {
  readonly type = ORDERS_ACTIONS.CREATE;
  constructor(public payload: { param: OrderCreateReq; source: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE;
  constructor(public payload: { param: OrderUpdateReq; source: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region UpdateQuantity
export class UpdateQuantityAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_QUANTITY;
  constructor(
    public payload: { param: OrderUpdateQuantityReq; source: string }
  ) {}
}

export class UpdateQuantitySuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_QUANTITY_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateQuantityErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_QUANTITY_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion UpdateQuantity

//#region SearchMetrics
export class SearchMetricsAction implements Action {
  readonly type = ORDERS_ACTIONS.SEARCH_METRICS;
  constructor(public payload: { param: SearchMetricseReq; source: string }) {}
}

export class SearchMetricsSuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.SEARCH_METRICS_SUCCESS;
  constructor(public payload: { data: SearchMetricsRes; source?: string }) {}
}

export class SearchMetricsErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.SEARCH_METRICS_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion SearchMetrics

//#region UpdateStatus
export class UpdateStatusAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_STATUS;
  constructor(public payload: { param: OrderUpdateStatusReq; source: string }) {}
}

export class UpdateStatusSuccessAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_STATUS_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateStatusErrorAction implements Action {
  readonly type = ORDERS_ACTIONS.UPDATE_STATUS_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion UpdateStatus
