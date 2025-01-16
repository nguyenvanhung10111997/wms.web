import { Component, inject, OnInit, ViewChild } from "@angular/core";
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
  LineCreateReq,
  LineRes,
  LineUpdateReq
} from "~src/app/stored/line/models";
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";
import { DialogDeleteLinesComponent } from "./dialogs/delete/delete.component";
import { FormsModule, NgModel } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: "lines-page",
  templateUrl: "lines.component.html",
  styleUrls: ["./lines.component.scss"],
  standalone: true,
  imports: [TableModule, ButtonModule, FormsModule, NgClass]
})
export class LinesPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  lineList: LineRes[];
  createValue: string = "";
  @ViewChild("createInput") createInput!: NgModel;

  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.dispatchLineGetAll();
    this.selectLineGetAll();
  }

  //#region  Select All Lines

  dispatchLineGetAll() {
    this._store.dispatch(
      new lineActions.GetAllAction({
        param: {},
        source: ""
      })
    );
  }

  selectLineGetAll() {
    this._store
      .select(lineSelectors.getAllError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.lineList = [];
        }
      });

    this._store
      .select(lineSelectors.getAllSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: LineRes[]; source: string }) => {
        if (response && response.data) {
          this._loader.hide();
          const result = response.data;

          this.lineList = result.map(item => ({
            ...item,
            isEdit: false
          }));
        }
      });
  }

  //#endregion

  //#region  Create Lines

  dispatchLineCreate(data: LineCreateReq) {
    this._store.dispatch(
      new lineActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectLineCreate() {
    this._store
      .select(lineSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(lineSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchLineGetAll();

          this.createValue = "";
          this.createInput.reset();
        }
      });
  }

  //#endregion

  //#region  Update Lines

  dispatchLineUpdate(data: LineUpdateReq) {
    this._store.dispatch(
      new lineActions.UpdateAction({
        param: data,
        source: ""
      })
    );
  }

  selectLineUpdate() {
    this._store
      .select(lineSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(lineSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchLineGetAll();
        }
      });
  }

  //#endregion

  onCreate() {
    if (this.createValue) {
      const data: LineCreateReq = {
        LineName: this.createValue
      };

      this.dispatchLineCreate(data);

      this.selectLineCreate();
    }
  }

  onEdit(line: any) {
    line.isEdit = !line.isEdit;

    if (line.isEdit === false) {
      this.selectLineGetAll();
    }
  }

  onSaveUpdate(line: any) {
    if (line.LineName.trim().length > 0) {
      const data: LineUpdateReq = {
        LineId: line.LineId,
        LineName: line.LineName
      };

      this.dispatchLineUpdate(data);

      line.isEdit = false;
    }
  }

  openDeleteDialog(lineID: number, lineName: string) {
    const dialog = this._dialog.open(DialogDeleteLinesComponent, {
      closeOnNavigation: true,
      restoreFocus: true,
      data: {
        lineID: lineID,
        lineName: lineName
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchLineGetAll();
      }
    });
  }
}
