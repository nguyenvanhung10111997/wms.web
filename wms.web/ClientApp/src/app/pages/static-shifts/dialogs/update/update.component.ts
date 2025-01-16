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
import { StaticShiftUpdateReq } from "~src/app/stored/static-shift/models";

import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";
import { CheckboxModule } from "primeng/checkbox";
@Component({
  selector: "dialog-update-static-shift",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule, CheckboxModule]
})
export class DialogUpdateStaticShiftComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  updateForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogUpdateStaticShiftComponent: MatDialogRef<DialogUpdateStaticShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | undefined
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateForm = this._fb.group({
      staticShiftName: [this.data?.StaticShiftName, Validators.required],
      staticShiftID: [
        { value: this.data?.StaticShiftId, disabled: true },
        Validators.required
      ],
      startTime: [this.data?.StartTime, Validators.required],
      endTime: [this.data?.EndTime, Validators.required],
      isOvertime: [this.data?.IsOvertime]
    });
  }

  //#region  Create Lines

  dispatchStaticShiftUpdate(data: StaticShiftUpdateReq) {
    this._store.dispatch(
      new staticShiftActions.UpdateAction({
        param: data,
        source: ""
      })
    );
  }

  selectStaticShiftUpdate() {
    this._store
      .select(staticShiftSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(staticShiftSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogUpdateStaticShiftComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onUpdate(event: Event) {
    event.preventDefault();
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
    } else {
      const data: StaticShiftUpdateReq = {
        StaticShiftId: this.updateForm.get("staticShiftID").value,
        StaticShiftName: this.updateForm.get("staticShiftName").value,
        StartTime: this.updateForm.get("startTime").value,
        EndTime: this.updateForm.get("endTime").value,
        IsOvertime: this.updateForm.get("isOvertime").value
      };

      this.dispatchStaticShiftUpdate(data);
      this.selectStaticShiftUpdate();
    }
  }
}
