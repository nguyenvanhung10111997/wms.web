import { Action } from "@ngrx/store";
import { WeatherForecastRes } from "../models";

export const WEATHER_FORECAST_ACTIONS = {
    RESET_ACTION: "[WEATHER_FORECAST] RESET_ACTION",
    GET_LIST: "[WEATHER_FORECAST] GET_LIST",
    GET_LIST_ERROR: "[WEATHER_FORECAST] GET_LIST_ERROR",
    GET_LIST_SUCCESS: "[WEATHER_FORECAST] GET_LIST_SUCCESS",
};

//#region RESET_ACTION
export class ResetAction implements Action {
    readonly type = WEATHER_FORECAST_ACTIONS.RESET_ACTION;
    constructor() { }
}
//#region RESET_ACTION

//#region GetList
export class GetListAction implements Action {
    readonly type = WEATHER_FORECAST_ACTIONS.GET_LIST;
  constructor(public payload: { param: {}, source: string }) { }
}

export class GetListSuccessAction implements Action {
    readonly type = WEATHER_FORECAST_ACTIONS.GET_LIST_SUCCESS;
  constructor(public payload: { data: WeatherForecastRes[], source?: string }) { }
}

export class GetListErrorAction implements Action {
    readonly type = WEATHER_FORECAST_ACTIONS.GET_LIST_ERROR;
    constructor(public payload: { error: Error, source: string }) { }
}
//#endregion GetList
