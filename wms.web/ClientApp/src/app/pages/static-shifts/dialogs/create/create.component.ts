import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { finalize, takeUntil } from "rxjs";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import { StaticShiftCreateReq } from "~src/app/stored/static-shift/models";
import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";

@Component({
  selector: "dialog-create-static-shift",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule]
})
export class DialogCreateStaticShiftComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  createForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogCreateStaticShiftComponent: MatDialogRef<DialogCreateStaticShiftComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm = this._fb.group({
      staticShiftName: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      isOvertime: [false]
    });
  }

  //#region  Create Static Shift

  dispatchStaticShiftCreate(data: StaticShiftCreateReq) {
    this._store.dispatch(
      new staticShiftActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectStaticShiftCreate() {
    this._store
      .select(staticShiftSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(staticShiftSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogCreateStaticShiftComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onCreate(event: Event) {
    event.preventDefault();
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
    } else {
      const data: StaticShiftCreateReq = {
        StaticShiftName: this.createForm.get("staticShiftName").value,
        StartTime: this.createForm.get("startTime").value,
        EndTime: this.createForm.get("endTime").value,
        IsOvertime: this.createForm.get("isOvertime").value
      };

      this.dispatchStaticShiftCreate(data);

      this.selectStaticShiftCreate();
    }
  }
}
