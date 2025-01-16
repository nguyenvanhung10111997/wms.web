import { Action } from "@ngrx/store";
import { MachinesRes } from "../models/response/machines.res";
import {
  MachinesCreateReq,
  MachinesUpdateReq
} from "../models/request/machines.req";

export const MACHINES_ACTIONS = {
  RESET_ACTION: "[MACHINES] RESET_ACTION",

  GET_ALL: "[MACHINES] GET_ALL",
  GET_ALL_ERROR: "[MACHINES] GET_ALL_ERROR",
  GET_ALL_SUCCESS: "[MACHINES] GET_ALL_SUCCESS",

  CREATE: "[MACHINES] CREATE",
  CREATE_ERROR: "[MACHINES] CREATE_ERROR",
  CREATE_SUCCESS: "[MACHINES] CREATE_SUCCESS",

  UPDATE: "[MACHINES] UPDATE",
  UPDATE_ERROR: "[MACHINES] UPDATE_ERROR",
  UPDATE_SUCCESS: "[MACHINES] UPDATE_SUCCESS",

  DELETE: "[MACHINES] DELETE",
  DELETE_ERROR: "[MACHINES] DELETE_ERROR",
  DELETE_SUCCESS: "[MACHINES] DELETE_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = MACHINES_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region getAll
export class GetAllAction implements Action {
  readonly type = MACHINES_ACTIONS.GET_ALL;
  constructor(public payload: { param: {}; source: string }) {}
}

export class GetAllSuccessAction implements Action {
  readonly type = MACHINES_ACTIONS.GET_ALL_SUCCESS;
  constructor(public payload: { data: MachinesRes[]; source?: string }) {}
}

export class GetAllErrorAction implements Action {
  readonly type = MACHINES_ACTIONS.GET_ALL_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion getAll

//#region Create
export class CreateAction implements Action {
  readonly type = MACHINES_ACTIONS.CREATE;
  constructor(public payload: { param: MachinesCreateReq; source: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = MACHINES_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = MACHINES_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = MACHINES_ACTIONS.UPDATE;
  constructor(public payload: { param: MachinesUpdateReq; source: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = MACHINES_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = MACHINES_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region Delete
export class DeleteAction implements Action {
  readonly type = MACHINES_ACTIONS.DELETE;
  constructor(public payload: { param: number; source: string }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = MACHINES_ACTIONS.DELETE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class DeleteErrorAction implements Action {
  readonly type = MACHINES_ACTIONS.DELETE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Delete
