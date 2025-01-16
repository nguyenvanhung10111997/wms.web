import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { finalize, takeUntil } from "rxjs";
import { BreakpointService } from "~src/app/services/breakpoint.service";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import { MachinesRes } from "~src/app/stored/machines/models/response/machines.res";
import * as machinesActions from "~stored/machines/state/machines.action";
import * as machinesSelectors from "~stored/machines/state/machines.selector";
import { MatDialog } from "@angular/material/dialog";
import { DialogDeleteMachinesComponent } from "./dialogs/delete/delete.component";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  MachinesCreateReq,
  MachinesUpdateReq
} from "~src/app/stored/machines/models/request/machines.req";
import { NgClass } from "@angular/common";
@Component({
  selector: "machines-page",
  templateUrl: "machines.component.html",
  styleUrls: ["./machines.component.scss"],
  standalone: true,
  imports: [TableModule, ButtonModule, FormsModule, NgClass]
})
export class MachinesPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  machineList: MachinesRes[];

  createValue: string = "";

  @ViewChild("createInput") createInput!: NgModel;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.selectMachineCreate();
    this.dispatchMachinesGetAll();
    this.selectMachinesGetAll();
  }

  dispatchMachinesGetAll() {
    this._store.dispatch(
      new machinesActions.GetAllAction({
        param: {},
        source: ""
      })
    );
  }

  selectMachinesGetAll() {
    this._store
      .select(machinesSelectors.getAllError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.machineList = [];
        }
      });

    this._store
      .select(machinesSelectors.getAllSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: MachinesRes[]; source: string }) => {
        if (response && response.data) {
          this._loader.hide();
          const result = response.data;

          this.machineList = result.map(item => ({
            ...item,
            isEdit: false
          }));
        }
      });
  }

  openDeleteDialog(machine) {
    const dialog = this._dialog.open(DialogDeleteMachinesComponent, {
      closeOnNavigation: true,
      restoreFocus: true,
      data: {
        machineID: machine.MachineId,
        machineName: machine.MachineName
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchMachinesGetAll();
      }
    });
  }

  //#region  Create Machines

  dispatchMachineCreate(data: MachinesCreateReq) {
    this._store.dispatch(
      new machinesActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectMachineCreate() {
    this._store
      .select(machinesSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(machinesSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchMachinesGetAll();

          this.createValue = "";
          this.createInput.reset();
        }
      });
  }

  //#endregion

  //#region  Update Machines

  dispatchMachinesUpdate(data: MachinesUpdateReq) {
    this._store.dispatch(
      new machinesActions.UpdateAction({
        param: data,
        source: ""
      })
    );
  }

  selectMachinesUpdate() {
    this._store
      .select(machinesSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(machinesSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.selectMachinesGetAll();
        }
      });
  }

  //#endregion

  onCreate(event: Event) {
    event.preventDefault();

    if (this.createValue) {
      const data: MachinesCreateReq = {
        MachineName: this.createValue,
        IsSum: true
      };

      this.dispatchMachineCreate(data);

      this.selectMachineCreate();
    }
  }

  onEdit(machine: any) {
    machine.isEdit = !machine.isEdit;

    console.log(machine.isEdit);

    if (machine.isEdit === false) {
      this.selectMachinesGetAll();
    }
  }

  onSaveUpdate(machine: any) {
    if (machine.MachineName.trim().length > 0) {
      const data: MachinesUpdateReq = {
        ClusterId: machine?.ClusterId,
        MachineId: machine.MachineId,
        MachineName: machine.MachineName,
        IsSum: true
      };

      this.dispatchMachinesUpdate(data);

      machine.isEdit = false;
    }
  }
}
