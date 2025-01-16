import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./line-cluster-product.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { LineClusterProductService } from "../line-cluster-product.service";

@Injectable()
export class LineClusterProductEffect {
  constructor(
    private actions$: Actions,
    private _service: LineClusterProductService
  ) {}

  //#region search
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH),
      map((action: actions.SearchAction) => action.payload),
      mergeMap(action => {
        return this._service.search(action.param).pipe(
          map(response => {
            return new actions.SearchSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.SearchErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion search

  //#region create
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_CLUSTER_PRODUCT_ACTIONS.CREATE),
      map((action: actions.CreateAction) => action.payload),
      mergeMap(action => {
        return this._service.create(action.param).pipe(
          map(response => {
            return new actions.CreateSuccessAction({
              status: response
            });
          }),
          catchError(err => {
            return [
              new actions.CreateErrorAction({
                error: err
              })
            ];
          })
        );
      })
    )
  );
  //#endregion create

  //#region update
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_CLUSTER_PRODUCT_ACTIONS.UPDATE),
      map((action: actions.UpdateAction) => action.payload),
      mergeMap(action => {
        return this._service.update(action.param).pipe(
          map(response => {
            return new actions.UpdateSuccessAction({
              status: response
            });
          }),
          catchError(err => {
            return [
              new actions.UpdateErrorAction({
                error: err
              })
            ];
          })
        );
      })
    )
  );
  //#endregion update

  //#region searchMetric
  searchMetric$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LINE_CLUSTER_PRODUCT_ACTIONS.SEARCH_METRIC),
      map((action: actions.SearchMetricAction) => action.payload),
      mergeMap(action => {
        return this._service.searchMetrics(action.param).pipe(
          map(response => {
            return new actions.SearchMetricSuccessAction({
              data: response,
              source: action?.source
            });
          }),
          catchError(err => {
            return [
              new actions.SearchErrorAction({
                error: err,
                source: action?.source
              })
            ];
          })
        );
      })
    )
  );
  //#endregion searchMetric
}
