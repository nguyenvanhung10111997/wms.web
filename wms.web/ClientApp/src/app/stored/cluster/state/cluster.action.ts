import { Action } from "@ngrx/store";
import { ClusterCreateReq, ClusterRes, ClusterUpdateReq } from "../models";

export const CLUSTER_ACTIONS = {
  RESET_ACTION: "[CLUSTER] RESET_ACTION",

  CREATE: "[CLUSTER] CREATE",
  CREATE_ERROR: "[CLUSTER] CREATE_ERROR",
  CREATE_SUCCESS: "[CLUSTER] CREATE_SUCCESS",

  UPDATE: "[CLUSTER] UPDATE",
  UPDATE_ERROR: "[CLUSTER] UPDATE_ERROR",
  UPDATE_SUCCESS: "[CLUSTER] UPDATE_SUCCESS",

  DELETE: "[CLUSTER] DELETE",
  DELETE_ERROR: "[CLUSTER] DELETE_ERROR",
  DELETE_SUCCESS: "[CLUSTER] DELETE_SUCCESS",

  GET_ALL: "[CLUSTER] GET_ALL",
  GET_ALL_ERROR: "[CLUSTER] GET_ALL_ERROR",
  GET_ALL_SUCCESS: "[CLUSTER] GET_ALL_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = CLUSTER_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region getAll
export class GetAllAction implements Action {
  readonly type = CLUSTER_ACTIONS.GET_ALL;
  constructor(public payload: { param: {}; source: string }) {}
}

export class GetAllSuccessAction implements Action {
  readonly type = CLUSTER_ACTIONS.GET_ALL_SUCCESS;
  constructor(public payload: { data: ClusterRes[]; source?: string }) {}
}

export class GetAllErrorAction implements Action {
  readonly type = CLUSTER_ACTIONS.GET_ALL_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion getAll

//#region Create
export class CreateAction implements Action {
  readonly type = CLUSTER_ACTIONS.CREATE;
  constructor(public payload: { param: ClusterCreateReq; source: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = CLUSTER_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = CLUSTER_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = CLUSTER_ACTIONS.UPDATE;
  constructor(public payload: { param: ClusterUpdateReq; source: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = CLUSTER_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = CLUSTER_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region Delete
export class DeleteAction implements Action {
  readonly type = CLUSTER_ACTIONS.DELETE;
  constructor(public payload: { param: number; source: string }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = CLUSTER_ACTIONS.DELETE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class DeleteErrorAction implements Action {
  readonly type = CLUSTER_ACTIONS.DELETE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Delete
