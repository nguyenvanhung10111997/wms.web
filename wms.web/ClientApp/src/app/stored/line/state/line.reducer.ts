import { AppAction } from "~src/app/stored/app.action";
import * as actions from "./line.action";
import { ILineState, initialLineState } from "./line.state";

export function reducer(
  state = initialLineState,
  action: AppAction
): ILineState {
  switch (action.type) {
    //#region RESET_ACTION
    case actions.LINE_ACTIONS.RESET_ACTION:
      return {
        ...state,
        action: actions.LINE_ACTIONS.RESET_ACTION,
        selected: null,
        data: null,
        done: true,
        error: null
      };
    //#endregion RESET_ACTION

    //#region GET_ALL
    case actions.LINE_ACTIONS.GET_ALL:
      return {
        ...state,
        action: actions.LINE_ACTIONS.GET_ALL,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.GET_ALL_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.GET_ALL,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.GET_ALL_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.GET_ALL,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion GET_ALL

    //#region CREATE
    case actions.LINE_ACTIONS.CREATE:
      return {
        ...state,
        action: actions.LINE_ACTIONS.CREATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.CREATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.CREATE_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.CREATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion CREATE

    //#region UPDATE
    case actions.LINE_ACTIONS.UPDATE:
      return {
        ...state,
        action: actions.LINE_ACTIONS.UPDATE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.UPDATE_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.UPDATE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.UPDATE_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.UPDATE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion UPDATE

    //#region DELETE
    case actions.LINE_ACTIONS.DELETE:
      return {
        ...state,
        action: actions.LINE_ACTIONS.DELETE,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.DELETE_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.DELETE,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.DELETE_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.DELETE,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion DELETE

    //#region READ_CLUSTER
    case actions.LINE_ACTIONS.READ_CLUSTER:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_CLUSTER,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.READ_CLUSTER_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_CLUSTER,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.READ_CLUSTER_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_CLUSTER,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion READ_CLUSTER

    //#region READ_BY_ID
    case actions.LINE_ACTIONS.READ_BY_ID:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_BY_ID,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.READ_BY_ID_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_BY_ID,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.READ_BY_ID_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_BY_ID,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion READ_BY_ID

    //#region READ_STATISTIC
    case actions.LINE_ACTIONS.READ_STATISTIC:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_STATISTIC,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.LINE_ACTIONS.READ_STATISTIC_SUCCESS:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_STATISTIC,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.LINE_ACTIONS.READ_STATISTIC_ERROR:
      return {
        ...state,
        action: actions.LINE_ACTIONS.READ_STATISTIC,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion READ_STATISTIC
  }
  return state;
}
