import { Action } from "@ngrx/store";
import {
  ILineByID,
  IStatisticRes,
  LineCreateReq,
  LineReadClusterRes,
  LineRes,
  LineUpdateReq
} from "../models";

export const LINE_ACTIONS = {
  RESET_ACTION: "[LINE] RESET_ACTION",

  READ_CLUSTER: "[LINE] READ_CLUSTER",
  READ_CLUSTER_ERROR: "[LINE] READ_CLUSTER_ERROR",
  READ_CLUSTER_SUCCESS: "[LINE] READ_CLUSTER_SUCCESS",

  READ_BY_ID: "[LINE] READ_BY_ID",
  READ_BY_ID_ERROR: "[LINE] READ_BY_ID_ERROR",
  READ_BY_ID_SUCCESS: "[LINE] READ_BY_ID_SUCCESS",

  CREATE: "[LINE] CREATE",
  CREATE_ERROR: "[LINE] CREATE_ERROR",
  CREATE_SUCCESS: "[LINE] CREATE_SUCCESS",

  UPDATE: "[LINE] UPDATE",
  UPDATE_ERROR: "[LINE] UPDATE_ERROR",
  UPDATE_SUCCESS: "[LINE] UPDATE_SUCCESS",

  DELETE: "[LINE] DELETE",
  DELETE_ERROR: "[LINE] DELETE_ERROR",
  DELETE_SUCCESS: "[LINE] DELETE_SUCCESS",

  GET_ALL: "[LINE] GET_ALL",
  GET_ALL_ERROR: "[LINE] GET_ALL_ERROR",
  GET_ALL_SUCCESS: "[LINE] GET_ALL_SUCCESS",

  READ_STATISTIC: "[LINE] READ_STATISTIC",
  READ_STATISTIC_ERROR: "[LINE] READ_STATISTIC_ERROR",
  READ_STATISTIC_SUCCESS: "[LINE] READ_STATISTIC_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = LINE_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region getAll
export class GetAllAction implements Action {
  readonly type = LINE_ACTIONS.GET_ALL;
  constructor(public payload: { param: {}; source: string }) {}
}

export class GetAllSuccessAction implements Action {
  readonly type = LINE_ACTIONS.GET_ALL_SUCCESS;
  constructor(public payload: { data: LineRes[]; source?: string }) {}
}

export class GetAllErrorAction implements Action {
  readonly type = LINE_ACTIONS.GET_ALL_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion getAll

//#region Create
export class CreateAction implements Action {
  readonly type = LINE_ACTIONS.CREATE;
  constructor(public payload: { param: LineCreateReq; source: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = LINE_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = LINE_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = LINE_ACTIONS.UPDATE;
  constructor(public payload: { param: LineUpdateReq; source: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = LINE_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = LINE_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region Delete
export class DeleteAction implements Action {
  readonly type = LINE_ACTIONS.DELETE;
  constructor(public payload: { param: number; source: string }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = LINE_ACTIONS.DELETE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class DeleteErrorAction implements Action {
  readonly type = LINE_ACTIONS.DELETE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Delete

//#region ReadCluster
export class ReadClusterAction implements Action {
  readonly type = LINE_ACTIONS.READ_CLUSTER;
  constructor(public payload: { param: number; source: string }) {}
}

export class ReadClusterSuccessAction implements Action {
  readonly type = LINE_ACTIONS.READ_CLUSTER_SUCCESS;
  constructor(public payload: { data: LineReadClusterRes; source?: string }) {}
}

export class ReadClusterErrorAction implements Action {
  readonly type = LINE_ACTIONS.READ_CLUSTER_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion ReadCluster

//#region ReadById
export class ReadByIdAction implements Action {
  readonly type = LINE_ACTIONS.READ_BY_ID;
  constructor(public payload: { lineID: number; source: number }) {}
}

export class ReadByIdSuccessAction implements Action {
  readonly type = LINE_ACTIONS.READ_BY_ID_SUCCESS;
  constructor(public payload: { data: ILineByID; source?: number }) {}
}

export class ReadByIdErrorAction implements Action {
  readonly type = LINE_ACTIONS.READ_BY_ID_ERROR;
  constructor(public payload: { error: Error; source: number }) {}
}
//#endregion ReadById

//#region readStatistic
export class ReadStatisticAction implements Action {
  readonly type = LINE_ACTIONS.READ_STATISTIC;
  constructor(
    public payload: { param: { RequestTime: string }; source: string }
  ) {}
}

export class ReadStatisticSuccessAction implements Action {
  readonly type = LINE_ACTIONS.READ_STATISTIC_SUCCESS;
  constructor(public payload: { data: IStatisticRes[]; source?: string }) {}
}

export class ReadStatisticErrorAction implements Action {
  readonly type = LINE_ACTIONS.READ_STATISTIC_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion readStatistic
