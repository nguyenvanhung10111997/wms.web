import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IWeatherForecastState extends IBaseState {
}

export const initialWeatherForecastState: IWeatherForecastState = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null,
    source: null
}

export const getWeatherForecastState = (state: IAppState) => state.weatherForecast;
