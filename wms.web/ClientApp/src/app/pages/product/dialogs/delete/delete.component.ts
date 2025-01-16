import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { finalize, takeUntil } from "rxjs";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import * as productActions from "~stored/product/state/product.action";
import * as productSelectors from "~stored/product/state/product.selector";

@Component({
  selector: "dialog-delete-product",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule]
})
export class DialogDeleteProductComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogDeleteProductComponent: MatDialogRef<DialogDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | undefined
  ) {
    super();
  }

  ngOnInit(): void {}

  //#region  Create Lines

  dispatchLineDelete(LineID: number) {
    this._store.dispatch(
      new productActions.DeleteAction({
        param: LineID,
        source: ""
      })
    );
  }

  selectLineDelete() {
    this._store
      .select(productSelectors.deleteError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(productSelectors.deleteSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogDeleteProductComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onDelete(event: Event) {
    if (this.data?.productID !== 0) {
      this.dispatchLineDelete(this.data.productID);

      this.selectLineDelete();
    }
  }

  onNoClick(): void {
    this.DialogDeleteProductComponent.close();
  }
}
