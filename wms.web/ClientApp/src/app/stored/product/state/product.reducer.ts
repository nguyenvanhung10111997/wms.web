import { AppAction } from "~src/app/stored/app.action";
import * as actions from "./product.action";
import { IProductState, initialProductState } from "./product.state";

export function reducer(
  state = initialProductState,
  action: AppAction
): IProductState {
  switch (action.type) {
    //#region RESET_ACTION
    case actions.PRODUCT_ACTIONS.RESET_ACTION:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.RESET_ACTION,
        selected: null,
        data: null,
        done: true,
        error: null
      };
    //#endregion RESET_ACTION

    //#region GET_ALL
    case actions.PRODUCT_ACTIONS.GET_ALL:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.GET_ALL,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.PRODUCT_ACTIONS.GET_ALL_SUCCESS:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.GET_ALL,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.PRODUCT_ACTIONS.GET_ALL_ERROR:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.GET_ALL,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion GET_ALL

    //#region CREATE
    case actions.PRODUCT_ACTIONS.CREATE:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.CREATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.PRODUCT_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.CREATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.PRODUCT_ACTIONS.CREATE_ERROR:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.CREATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion CREATE

    //#region UPDATE
    case actions.PRODUCT_ACTIONS.UPDATE:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.UPDATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.PRODUCT_ACTIONS.UPDATE_SUCCESS:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.UPDATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.PRODUCT_ACTIONS.UPDATE_ERROR:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.UPDATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion UPDATE

    //#region DELETE
    case actions.PRODUCT_ACTIONS.DELETE:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.DELETE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.PRODUCT_ACTIONS.DELETE_SUCCESS:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.DELETE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.PRODUCT_ACTIONS.DELETE_ERROR:
      return {
        ...state,
        action: actions.PRODUCT_ACTIONS.DELETE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion DELETE
  }
  return state;
}
