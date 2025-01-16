import { createSelector } from "@ngrx/store";
import * as actions from "./line.action";
import { ILineState as IState, getLineState as State } from "./line.state";

//#region GET_ALL
export const getAllSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.GET_ALL &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const getAllError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.GET_ALL ? state.error : null;
});
//#endregion GET_ALL

//#region CREATE
export const createSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.CREATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const createError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.CREATE ? state.error : null;
});
//#endregion CREATE

//#region UPDATE
export const updateSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.UPDATE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const updateError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.UPDATE ? state.error : null;
});
//#endregion UPDATE

//#region DELETE
export const deleteSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.DELETE &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const deleteError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.DELETE ? state.error : null;
});
//#endregion DELETE

//#region READ_CLUSTER
export const readClustersSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.READ_CLUSTER &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const readClustersError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.READ_CLUSTER
    ? state.error
    : null;
});
//#endregion READ_CLUSTER

//#region READ_BY_ID
export const readByIdSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.READ_BY_ID &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const readByIdError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.READ_BY_ID ? state.error : null;
});
//#endregion READ_BY_ID

//#region readStatistic
export const readStatisticSuccess = createSelector(State, (state: IState) => {
  if (
    state.action === actions.LINE_ACTIONS.READ_STATISTIC &&
    state.done &&
    !state.error
  ) {
    return state.data;
  } else {
    return null;
  }
});

export const readStatisticError = createSelector(State, (state: IState) => {
  return state.action === actions.LINE_ACTIONS.READ_STATISTIC
    ? state.error
    : null;
});
//#endregion readStatistic
