import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./line.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { LineService } from "../line.service";

@Injectable()
export class LineEffect {
  constructor(
    private actions$: Actions,
    private _service: LineService
  ) {}

  //#region GET_ALL
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.GET_ALL),
      map((action: actions.GetAllAction) => action.payload),
      mergeMap(action => {
        return this._service.getAll().pipe(
          map(response => {
            return new actions.GetAllSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.GetAllErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion GET_ALL

  //#region CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.CREATE),
      map((action: actions.CreateAction) => action.payload),
      mergeMap(action => {
        return this._service.create(action.param).pipe(
          map(response => {
            return new actions.CreateSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.CreateErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion CREATE

  //#region UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.UPDATE),
      map((action: actions.UpdateAction) => action.payload),
      mergeMap(action => {
        return this._service.update(action.param).pipe(
          map(response => {
            return new actions.UpdateSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.UpdateErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion UPDATE

  //#region DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.DELETE),
      map((action: actions.DeleteAction) => action.payload),
      mergeMap(action => {
        return this._service.delete(action.param).pipe(
          map(response => {
            return new actions.DeleteSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.DeleteErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion DELETE

  //#region READ_CLUSTER
  readClusters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.READ_CLUSTER),
      map((action: actions.ReadClusterAction) => action.payload),
      mergeMap(action => {
        return this._service.readClusters(action.param).pipe(
          map(response => {
            return new actions.ReadClusterSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.ReadClusterErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );

  //#endregion READ_CLUSTER

  //#region READ_BY_ID
  readById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.READ_BY_ID),
      map((action: actions.ReadByIdAction) => action.payload),
      mergeMap(action => {
        return this._service.readById(action?.lineID).pipe(
          map(response => {
            return new actions.ReadByIdSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.ReadByIdErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );

  //#endregion READ_BY_ID

  //#region READ_STATISTIC
  readStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_ACTIONS.READ_STATISTIC),
      map((action: actions.ReadStatisticAction) => action.payload),
      mergeMap(action => {
        return this._service.readStatistic(action.param).pipe(
          map(response => {
            return new actions.ReadStatisticSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.ReadStatisticErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion READ_STATISTIC
}
