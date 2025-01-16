import { createSelector } from "@ngrx/store";
import * as actions from "./orders.action";
import {
  IOrdersState as IState,
  getOrdersState as State
} from "./orders.state";

//#region getOrdersByLineID
export const getOrdersByLineIDSuccess = createSelector(
  State,
  (state: IState) => {
    if (
      state.action === actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID &&
      state.done &&
      !state.error
    ) {
      return state.data;
    } else {
      return null;
    }
  }
);

export const getOrdersByLineIDError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID
    ? state.error
    : null;
});
//#endregion getOrdersByLineID

//#region create
export const createSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.ORDERS_ACTIONS.CREATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const createError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.CREATE ? state.error : null;
});
//#endregion create

//#region update
export const updateSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.ORDERS_ACTIONS.UPDATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.UPDATE ? state.error : null;
});
//#endregion update

//#region updateQuantity
export const updateQuantitySuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.ORDERS_ACTIONS.UPDATE_QUANTITY &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateQuantityError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.UPDATE_QUANTITY
    ? state.error
    : null;
});
//#endregion updateQuantity

//#region searchMetrics
export const searchMetricsSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.ORDERS_ACTIONS.SEARCH_METRICS &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const searchMetricsError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.SEARCH_METRICS
    ? state.error
    : null;
});
//#endregion searchMetrics


//#region updateStatus
export const updateStatusSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.ORDERS_ACTIONS.UPDATE_STATUS &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateStatusError = createSelector(State, (state: IState) => {
  return state.action === actions.ORDERS_ACTIONS.UPDATE_STATUS ? state.error : null;
});
//#endregion updateStatus
