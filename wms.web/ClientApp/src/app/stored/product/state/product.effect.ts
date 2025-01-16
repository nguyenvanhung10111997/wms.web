import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./product.action";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private _service: ProductService
  ) {}

  //#region GET_ALL
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.PRODUCT_ACTIONS.GET_ALL),
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
      ofType(actions.PRODUCT_ACTIONS.CREATE),
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
      ofType(actions.PRODUCT_ACTIONS.UPDATE),
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
      ofType(actions.PRODUCT_ACTIONS.DELETE),
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
}
