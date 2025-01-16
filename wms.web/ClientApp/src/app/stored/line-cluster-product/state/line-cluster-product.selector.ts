import { createSelector } from "@ngrx/store";
import * as actions from "./line-cluster-product.action";
import {
  ILineClusterProductState as IState,
  getLineClusterProductState as State
} from "./line-cluster-product.state";

//#region search
export const searchSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const searchError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH
    ? state.error
    : null;
});
//#endregion search

//#region create
export const createSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const createError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE
    ? state.error
    : null;
});
//#endregion create

//#region update
export const updateSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE
    ? state.error
    : null;
});
//#endregion update

//#region searchMetric
export const searchMetricSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const searchMetricError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC
    ? state.error
    : null;
});
//#endregion searchMetric
