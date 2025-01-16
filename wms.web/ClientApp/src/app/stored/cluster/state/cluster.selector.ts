import { createSelector } from "@ngrx/store";
import * as actions from "./cluster.action";
import {
  IClusterState as IState,
  getClusterState as State
} from "./cluster.state";

//#region GET_ALL
export const getAllSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.CLUSTER_ACTIONS.GET_ALL &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const getAllError = createSelector(State, (state: IState) => {
  return state.action === actions.CLUSTER_ACTIONS.GET_ALL ? state.error : null;
});
//#endregion GET_ALL

//#region CREATE
export const createSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.CLUSTER_ACTIONS.CREATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const createError = createSelector(State, (state: IState) => {
  return state.action === actions.CLUSTER_ACTIONS.CREATE ? state.error : null;
});
//#endregion CREATE

//#region UPDATE
export const updateSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.CLUSTER_ACTIONS.UPDATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateError = createSelector(State, (state: IState) => {
  return state.action === actions.CLUSTER_ACTIONS.UPDATE ? state.error : null;
});
//#endregion UPDATE

//#region DELETE
export const deleteSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.CLUSTER_ACTIONS.DELETE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const deleteError = createSelector(State, (state: IState) => {
  return state.action === actions.CLUSTER_ACTIONS.DELETE ? state.error : null;
});
//#endregion DELETE
