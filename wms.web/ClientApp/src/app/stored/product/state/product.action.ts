import { Action } from "@ngrx/store";
import { ProductCreateReq, ProductRes, ProductUpdateReq } from "../models";

export const PRODUCT_ACTIONS = {
  RESET_ACTION: "[PRODUCT] RESET_ACTION",

  CREATE: "[PRODUCT] CREATE",
  CREATE_ERROR: "[PRODUCT] CREATE_ERROR",
  CREATE_SUCCESS: "[PRODUCT] CREATE_SUCCESS",

  UPDATE: "[PRODUCT] UPDATE",
  UPDATE_ERROR: "[PRODUCT] UPDATE_ERROR",
  UPDATE_SUCCESS: "[PRODUCT] UPDATE_SUCCESS",

  DELETE: "[PRODUCT] DELETE",
  DELETE_ERROR: "[PRODUCT] DELETE_ERROR",
  DELETE_SUCCESS: "[PRODUCT] DELETE_SUCCESS",

  GET_ALL: "[PRODUCT] GET_ALL",
  GET_ALL_ERROR: "[PRODUCT] GET_ALL_ERROR",
  GET_ALL_SUCCESS: "[PRODUCT] GET_ALL_SUCCESS"
};

//#region RESET_ACTION
export class ResetAction implements Action {
  readonly type = PRODUCT_ACTIONS.RESET_ACTION;
  constructor() {}
}
//#region RESET_ACTION

//#region getAll
export class GetAllAction implements Action {
  readonly type = PRODUCT_ACTIONS.GET_ALL;
  constructor(public payload: { param: {}; source: string }) {}
}

export class GetAllSuccessAction implements Action {
  readonly type = PRODUCT_ACTIONS.GET_ALL_SUCCESS;
  constructor(public payload: { data: ProductRes[]; source?: string }) {}
}

export class GetAllErrorAction implements Action {
  readonly type = PRODUCT_ACTIONS.GET_ALL_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion getAll

//#region Create
export class CreateAction implements Action {
  readonly type = PRODUCT_ACTIONS.CREATE;
  constructor(public payload: { param: ProductCreateReq; source: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = PRODUCT_ACTIONS.CREATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class CreateErrorAction implements Action {
  readonly type = PRODUCT_ACTIONS.CREATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Create

//#region Update
export class UpdateAction implements Action {
  readonly type = PRODUCT_ACTIONS.UPDATE;
  constructor(public payload: { param: ProductUpdateReq; source: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = PRODUCT_ACTIONS.UPDATE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class UpdateErrorAction implements Action {
  readonly type = PRODUCT_ACTIONS.UPDATE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Update

//#region Delete
export class DeleteAction implements Action {
  readonly type = PRODUCT_ACTIONS.DELETE;
  constructor(public payload: { param: number; source: string }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = PRODUCT_ACTIONS.DELETE_SUCCESS;
  constructor(public payload: { data: boolean; source?: string }) {}
}

export class DeleteErrorAction implements Action {
  readonly type = PRODUCT_ACTIONS.DELETE_ERROR;
  constructor(public payload: { error: Error; source: string }) {}
}
//#endregion Delete
