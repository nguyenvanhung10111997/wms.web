import { AppAction } from "~src/app/stored/app.action";
import * as actions from "./orders.action";
import { IOrdersState, initialOrdersState } from "./orders.state";

export function reducer(
  state = initialOrdersState,
  action: AppAction
): IOrdersState {
  switch (action.type) {
    //#region RESET_ACTION
    case actions.ORDERS_ACTIONS.RESET_ACTION:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.RESET_ACTION,
        selected: null,
        data: null,
        done: true,
        error: null
      };
    //#endregion RESET_ACTION

    //#region READ_ORDERS_BY_LINE_ID
    case actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID_SUCCESS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID_ERROR:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion READ_ORDERS_BY_LINE_ID

    //#region CREATE
    case actions.ORDERS_ACTIONS.CREATE:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.CREATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.ORDERS_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.CREATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.ORDERS_ACTIONS.CREATE_ERROR:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.CREATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion CREATE

    //#region UPDATE
    case actions.ORDERS_ACTIONS.UPDATE:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.ORDERS_ACTIONS.UPDATE_SUCCESS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.ORDERS_ACTIONS.UPDATE_ERROR:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion UPDATE

    //#region UPDATE_QUANTITY
    case actions.ORDERS_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE_QUANTITY,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.ORDERS_ACTIONS.UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE_QUANTITY,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.ORDERS_ACTIONS.UPDATE_QUANTITY_ERROR:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.UPDATE_QUANTITY,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion UPDATE_QUANTITY

    //#region SEARCH_METRICS
    case actions.ORDERS_ACTIONS.SEARCH_METRICS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.SEARCH_METRICS,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.ORDERS_ACTIONS.SEARCH_METRICS_SUCCESS:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.SEARCH_METRICS,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.ORDERS_ACTIONS.SEARCH_METRICS_ERROR:
      return {
        ...state,
        action: actions.ORDERS_ACTIONS.SEARCH_METRICS,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion SEARCH_METRICS
  
      //#region UPDATE_STATUS
      case actions.ORDERS_ACTIONS.UPDATE_STATUS:
        return {
          ...state,
          action: actions.ORDERS_ACTIONS.UPDATE_STATUS,
          data: action.payload,
          done: false,
          selected: null,
          error: null
        };
      case actions.ORDERS_ACTIONS.UPDATE_STATUS_SUCCESS:
        return {
          ...state,
          action: actions.ORDERS_ACTIONS.UPDATE_STATUS,
          selected: null,
          data: action.payload,
          done: true,
          error: null
        };
      case actions.ORDERS_ACTIONS.UPDATE_STATUS_ERROR:
        return {
          ...state,
          action: actions.ORDERS_ACTIONS.UPDATE_STATUS,
          selected: null,
          data: null,
          done: true,
          error: action.payload
        };
      //#endregion UPDATE_STATUS
  
  }
  return state;
}
