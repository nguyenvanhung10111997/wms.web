import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./weather-forecast.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { WeatherForecastService } from "../weather-forecast.service";

@Injectable()
export class WeatherForecastEffect {
  constructor(private actions$: Actions, private _service: WeatherForecastService) { }

  //#region GET_LIST
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.WEATHER_FORECAST_ACTIONS.GET_LIST),
      map((action: actions.GetListAction) => action.payload),
      mergeMap((action) => {
        return this._service.getList().pipe(
          map(response => {
            return new actions.GetListSuccessAction({ data: response, source: action?.source });
          }),
          catchError(err => {
            return [new actions.GetListErrorAction({ error: err, source: action?.source })];
          })
        );
      })
    ));

  //#endregion GET_LIST

}
