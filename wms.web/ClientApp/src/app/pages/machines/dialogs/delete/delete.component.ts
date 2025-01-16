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
import * as machinesActions from "~stored/machines/state/machines.action";
import * as machinesSelectors from "~stored/machines/state/machines.selector";

@Component({
  selector: "dialog-delete-machine",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule]
})
export class DialogDeleteMachinesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogDeleteMachinesComponent: MatDialogRef<DialogDeleteMachinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | undefined
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectMachinesDelete();
  }

  //#region  Delete Machine

  dispatchMachinesDelete(machineID: number) {
    this._store.dispatch(
      new machinesActions.DeleteAction({
        param: machineID,
        source: ""
      })
    );
  }

  selectMachinesDelete() {
    this._store
      .select(machinesSelectors.deleteError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(machinesSelectors.deleteSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogDeleteMachinesComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onDelete(event: Event) {
    if (this.data?.machineID !== 0) {
      this.dispatchMachinesDelete(this.data.machineID);
    }
  }

  onNoClick(): void {
    this.DialogDeleteMachinesComponent.close();
  }
}
