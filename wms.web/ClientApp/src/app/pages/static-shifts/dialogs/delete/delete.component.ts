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
import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";

@Component({
  selector: "dialog-delete-static-shift",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule]
})
export class DialogDeleteStaticShiftComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogDeleteStaticShiftComponent: MatDialogRef<DialogDeleteStaticShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | undefined
  ) {
    super();
  }

  ngOnInit(): void {}

  //#region  Delete StaticShift

  dispatchStaticShiftDelete(StaticShiftID: number) {
    this._store.dispatch(
      new staticShiftActions.DeleteAction({
        param: StaticShiftID,
        source: ""
      })
    );
  }

  selectStaticShiftDelete() {
    this._store
      .select(staticShiftSelectors.deleteError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(staticShiftSelectors.deleteSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogDeleteStaticShiftComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onDelete(event: Event) {
    if (this.data?.staticShiftID !== 0) {
      this.dispatchStaticShiftDelete(this.data.staticShiftID);

      this.selectStaticShiftDelete();
    }
  }

  onNoClick(): void {
    this.DialogDeleteStaticShiftComponent.close();
  }
}
