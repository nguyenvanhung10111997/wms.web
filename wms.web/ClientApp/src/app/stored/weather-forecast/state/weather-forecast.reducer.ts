import { AppAction } from "~src/app/stored/app.action";
import * as actions from "./weather-forecast.action";
import { IWeatherForecastState, initialWeatherForecastState } from "./weather-forecast.state";

export function reducer(
  state = initialWeatherForecastState,
  action: AppAction
): IWeatherForecastState {
  switch (action.type) {

    //#region RESET_ACTION
    case actions.WEATHER_FORECAST_ACTIONS.RESET_ACTION:
      return {
        ...state,
        action: actions.WEATHER_FORECAST_ACTIONS.RESET_ACTION,
        selected: null,
        data: null,
        done: true,
        error: null
      };
    //#endregion RESET_ACTION

    //#region.GET_LIST
    case actions.WEATHER_FORECAST_ACTIONS.GET_LIST:
      return {
        ...state,
        action: actions.WEATHER_FORECAST_ACTIONS.GET_LIST,
        data: action.payload,
        done: false,
        selected: null,
        error: null
      };
    case actions.WEATHER_FORECAST_ACTIONS.GET_LIST_SUCCESS:
      return {
        ...state,
        action: actions.WEATHER_FORECAST_ACTIONS.GET_LIST,
        selected: null,
        data: action.payload,
        done: true,
        error: null
      };
    case actions.WEATHER_FORECAST_ACTIONS.GET_LIST_ERROR:
      return {
        ...state,
        action: actions.WEATHER_FORECAST_ACTIONS.GET_LIST,
        selected: null,
        data: null,
        done: true,
        error: action.payload
      };
    //#endregion.GET_LIST
  }
  return state;
}
