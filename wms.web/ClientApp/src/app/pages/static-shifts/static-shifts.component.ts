import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { finalize, takeUntil } from "rxjs";
import { BreakpointService } from "~src/app/services/breakpoint.service";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import {
  StaticShiftCreateReq,
  StaticShiftRes
} from "~src/app/stored/static-shift/models";
import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";
import { DialogCreateStaticShiftComponent } from "./dialogs/create/create.component";
import { DialogDeleteStaticShiftComponent } from "./dialogs/delete/delete.component";
import { DialogUpdateStaticShiftComponent } from "./dialogs/update/update.component";
import { CheckboxModule } from "primeng/checkbox";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
@Component({
  selector: "static-shifts-page",
  templateUrl: "static-shifts.component.html",
  styleUrls: ["static-shifts.component.scss"],
  standalone: true,
  imports: [TableModule, ButtonModule, ReactiveFormsModule, CheckboxModule]
})
export class StaticShiftsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  staticShiftsList: StaticShiftRes[];

  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  createForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createForm = this._fb.group({
      staticShiftName: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      isOvertime: [false]
    });

    this.selectStaticShiftGetAll();
    this.selectStaticShiftCreate();

    this.dispatchStaticShiftGetAll();
  }

  dispatchStaticShiftGetAll() {
    this._store.dispatch(
      new staticShiftActions.GetAllAction({
        param: {},
        source: ""
      })
    );
  }

  selectStaticShiftGetAll() {
    this._store
      .select(staticShiftSelectors.getAllError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.staticShiftsList = [];
        }
      });

    this._store
      .select(staticShiftSelectors.getAllSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: StaticShiftRes[]; source: string }) => {
        if (response && response.data) {
          this._loader.hide();
          const result = response.data;

          this.staticShiftsList = result;
        }
      });
  }

  openCreateDialog() {
    const dialog = this._dialog.open(DialogCreateStaticShiftComponent, {
      closeOnNavigation: true,
      minWidth: "40vw",
      restoreFocus: true
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchStaticShiftGetAll();
      }
    });
  }

  openUpdateDialog(staticShift: StaticShiftRes) {
    const dialog = this._dialog.open(DialogUpdateStaticShiftComponent, {
      closeOnNavigation: true,
      minWidth: "40vw",
      restoreFocus: true,
      data: staticShift
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchStaticShiftGetAll();
      }
    });
  }

  openDeleteDialog(staticShift: StaticShiftRes) {
    const dialog = this._dialog.open(DialogDeleteStaticShiftComponent, {
      closeOnNavigation: true,
      restoreFocus: true,
      data: {
        staticShiftID: staticShift.StaticShiftId,
        staticShiftName: staticShift.StaticShiftName
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchStaticShiftGetAll();
      }
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
          this.dispatchStaticShiftGetAll();
          this.onClearDataForm();
        }
      });
  }

  onClearDataForm() {
    this.createForm.get("staticShiftName").setValue("");
    this.createForm.get("startTime").setValue("");
    this.createForm.get("endTime").setValue("");
  }

  //#endregion

  onCreate(event: Event) {
    event.preventDefault();
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const data: StaticShiftCreateReq = {
      StaticShiftName: this.createForm.get("staticShiftName").value,
      StartTime: this.createForm.get("startTime").value,
      EndTime: this.createForm.get("endTime").value,
      IsOvertime: this.createForm.get("isOvertime").value
    };

    this.dispatchStaticShiftCreate(data);
  }

  ngOnDestroy(): void {
    this._store.dispatch(new staticShiftActions.ResetAction());
    this.subs?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
