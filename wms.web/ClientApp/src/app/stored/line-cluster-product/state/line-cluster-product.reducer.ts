import { AppAction } from "~src/app/stored/app.action";
import * as actions from "./line-cluster-product.action";
import {
  ILineClusterProductState,
  initialLineClusterProductState
} from "./line-cluster-product.state";

export function reducer(
  state = initialLineClusterProductState,
  action: AppAction
): ILineClusterProductState {
  switch (action.type) {
    //#region RESET_ACTION
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.RESET_ACTION:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.RESET_ACTION,
        selected: null,
        data: null,
        done: true,
        error: null
      };
    //#endregion RESET_ACTION

    //#region SEARCH
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_SUCCESS:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_ERROR:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion SEARCH

    //#region CREATE
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE_ERROR:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion CREATE

    //#region UPDATE
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE_SUCCESS:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE_ERROR:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion UPDATE

    //#region SEARCH_METRIC
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC_SUCCESS:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC_ERROR:
      return {
        ...state,
        action: actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion SEARCH_METRIC
  }
  return state;
}
