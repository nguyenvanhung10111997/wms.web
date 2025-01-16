import { createSelector } from "@ngrx/store";
import * as actions from "./weather-forecast.action";
import { IWeatherForecastState as IState, getWeatherForecastState as State } from "./weather-forecast.state";

//#region GET_LIST
export const getListSuccess = createSelector(
  State,
  (state: IState) => {
    if (
      state.action === actions.WEATHER_FORECAST_ACTIONS.GET_LIST &&
      state.done &&
      !state.error
    ) {
      return state.data;
    } else {
      return null;
    }
  }
);

export const getListError = createSelector(
  State,
  (state: IState) => {
    return state.action === actions.WEATHER_FORECAST_ACTIONS.GET_LIST
      ? state.error
      : null;
  }
);
//#endregion GET_LIST
