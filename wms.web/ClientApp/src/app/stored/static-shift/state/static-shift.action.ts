import { Action } from "@ngrx/store";
import {
  StaticShiftCreateReq,
  StaticShiftUpdateReq,
  StaticShiftRes
} from "../models";

export const STATIC_SHIFT_ACTIONS = {
  RESET_ACTION: "[STATIC_SHIFT] RESET_ACTION",

  READ_CLUSTER: "[STATIC_SHIFT] READ_CLUSTER",
  READ_CLUSTER_ERROR: "[STATIC_SHIFT] READ_CLUSTER_ERROR",
  READ_CLUSTER_SUCCESS: "[STATIC_SHIFT] READ_CLUSTER_SUCCESS",

  CREATE: "[STATIC_SHIFT] CREATE",
  CREATE_ERROR: "[STATIC_SHIFT] CREATE_ERROR",
  CREATE_SUCCESS: "[STATIC_SHIFT] CREATE_SUCCESS",

  UPDATE: "[STATIC_SHIFT] UPDATE",
  UPDATE_ERROR: "[STATIC_SHIFT] UPDATE_ERROR",
  UPDATE_SUCCESS: "[STATIC_SHIFT] UPDATE_SUCCESS",

  DELETE: "[STATIC_SHIFT] DELETE",
  DELETE_ERROR: "[STATIC_SHIFT] DELETE_ERROR",
  DELETE_SUCCESS: "[STATIC_SHIFT] DELETE_SUCCESS",

  GET_ALL: "[STATIC_SHIFT] GET_ALL",
  GET_ALL_ERROR: "[STATIC_SHIFT] GET_ALL_ERROR",
  GET_ALL_SUCCESS: "[STATIC_SHIFT] GET_ALL_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region getAll
export class GetAllAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.GET_ALL;
  constructor(public payload: { param: {}; source: string }) {}
}

export class GetAllSuccessAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.GET_ALL_SUCCESS;
  constructor(public payload: { data: StaticShiftRes[]; source?: string }) {}
}

export class GetAllErrorAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.GET_ALL_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion getAll

//#region Create
export class CreateAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.CREATE;
  constructor(
    public payload: { param: StaticShiftCreateReq; source: string }
  ) {}
}

export class CreateSuccessAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.UPDATE;
  constructor(
    public payload: { param: StaticShiftUpdateReq; source: string }
  ) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region Delete
export class DeleteAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.DELETE;
  constructor(public payload: { param: number; source: string }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.DELETE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class DeleteErrorAction implements Action {
  readonly type = STATIC_SHIFT_ACTIONS.DELETE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Delete
