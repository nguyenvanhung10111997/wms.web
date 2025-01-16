import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./orders.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { OrdersService } from "../orders.service";

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions,
    private _service: OrdersService
  ) {}

  //#region readOrdersByLineID
  readOrdersByLineID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ORDERS_ACTIONS.READ_ORDERS_BY_LINE_ID),
      map((action: actions.GetOrdersByLineIDAction) => action.payload),
      mergeMap(action => {
        return this._service.readOrderByLineID(action.lineID).pipe(
          map(response => {
            return new actions.GetOrdersByLineIDSuccessAction({
              data: response,
              source: action.lineID
            });
          }),
          catchError(err => {
            return [
              new actions.GetOrdersByLineIDErrorAction({
                error: err,
                source: action.lineID
              })
            ];
          })
        );
      })
    )
  );
  //#endregion readOrdersByLineID

  //#region create
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ORDERS_ACTIONS.CREATE),
      map((action: actions.CreateAction) => action.payload),
      mergeMap(action => {
        return this._service.create(action.param).pipe(
          map(response => {
            return new actions.CreateSuccessAction({
              data: response
            });
          }),
          catchError(err => {
            return [
              new actions.CreateErrorAction({
                error: err,
                source: ""
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
      ofType(actions.ORDERS_ACTIONS.UPDATE),
      map((action: actions.UpdateAction) => action.payload),
      mergeMap(action => {
        return this._service.update(action.param).pipe(
          map(response => {
            return new actions.UpdateSuccessAction({
              data: response
            });
          }),
          catchError(err => {
            return [
              new actions.UpdateErrorAction({
                error: err,
                source: ""
              })
            ];
          })
        );
      })
    )
  );
  //#endregion update

  //#region updateQuantity
  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ORDERS_ACTIONS.UPDATE_QUANTITY),
      map((action: actions.UpdateQuantityAction) => action.payload),
      mergeMap(action => {
        return this._service.updateQuantity(action.param).pipe(
          map(response => {
            return new actions.UpdateQuantitySuccessAction({
              data: response
            });
          }),
          catchError(err => {
            return [
              new actions.UpdateQuantityErrorAction({
                error: err,
                source: ""
              })
            ];
          })
        );
      })
    )
  );
  //#endregion updateQuantity

  //#region searchMetrics
  searchMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ORDERS_ACTIONS.SEARCH_METRICS),
      map((action: actions.SearchMetricsAction) => action.payload),
      mergeMap(action => {
        return this._service.searchMetrics(action.param).pipe(
          map(response => {
            return new actions.SearchMetricsSuccessAction({
              data: response
            });
          }),
          catchError(err => {
            return [
              new actions.SearchMetricsErrorAction({
                error: err,
                source: ""
              })
            ];
          })
        );
      })
    )
  );
  //#endregion searchMetrics

    //#region updateStatus
    updateStatus$ = createEffect(() =>
      this.actions$.pipe(
        ofType(actions.ORDERS_ACTIONS.UPDATE_STATUS),
        map((action: actions.UpdateStatusAction) => action.payload),
        mergeMap(action => {
          return this._service.updateStatus(action.param).pipe(
            map(response => {
              return new actions.UpdateStatusSuccessAction({
                data: response
              });
            }),
            catchError(err => {
              return [
                new actions.UpdateStatusErrorAction({
                  error: err,
                  source: ""
                })
              ];
            })
          );
        })
      )
    );
    //#endregion updateStatus
  
}
