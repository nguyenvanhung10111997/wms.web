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
import {
  ClusterCreateReq,
  ClusterRes,
  ClusterUpdateReq
} from "~src/app/stored/cluster/models";
import * as clusterActions from "~stored/cluster/state/cluster.action";
import * as clusterSelectors from "~stored/cluster/state/cluster.selector";
import { MatDialog } from "@angular/material/dialog";
import { DialogDeleteLinesComponent } from "./delete/delete.component";
import { FormBuilder, FormsModule, NgModel } from "@angular/forms";
import { NgClass } from "@angular/common";
@Component({
  selector: "clusters-page",
  templateUrl: "./clusters.component.html",
  styleUrls: ["./clusters.component.scss"],
  standalone: true,
  imports: [TableModule, ButtonModule, FormsModule, NgClass]
})
export class ClustersPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  clusterList: ClusterRes[];
  createValue: string = "";

  @ViewChild("createInput") createInput!: NgModel;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.selectClusterGetAll();
    this.selectClusterCreate();

    this.dispatchClusterGetAll();
  }

  dispatchClusterGetAll() {
    this._store.dispatch(
      new clusterActions.GetAllAction({
        param: {},
        source: ""
      })
    );
  }

  selectClusterGetAll() {
    this._store
      .select(clusterSelectors.getAllError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.clusterList = [];
        }
      });

    this._store
      .select(clusterSelectors.getAllSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: ClusterRes[]; source: string }) => {
        if (response && response.data) {
          this._loader.hide();
          const result = response.data;

          this.clusterList = result.map(item => ({
            ...item,
            isEdit: false
          }));
        }
      });
  }

  openDeleteDialog(cluster: ClusterRes) {
    const dialog = this._dialog.open(DialogDeleteLinesComponent, {
      closeOnNavigation: true,
      restoreFocus: true,
      data: {
        clusterID: cluster.ClusterId,
        clusterName: cluster.ClusterName
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchClusterGetAll();
      }
    });
  }

  //#region  Create Lines

  dispatchClusterCreate(data: ClusterCreateReq) {
    this._store.dispatch(
      new clusterActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectClusterCreate() {
    this._store
      .select(clusterSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(clusterSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchClusterGetAll();

          this.createValue = "";
          this.createInput.reset();
        }
      });
  }

  //#endregion

  //#region  Update Cluster

  dispatchClusterUpdate(data: ClusterUpdateReq) {
    this._store.dispatch(
      new clusterActions.UpdateAction({
        param: data,
        source: ""
      })
    );
  }

  selectClusterUpdate() {
    this._store
      .select(clusterSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(clusterSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchClusterGetAll();
        }
      });
  }

  //#endregion

  onCreate(event: Event) {
    event.preventDefault();

    if (this.createValue) {
      const data: ClusterCreateReq = {
        ClusterName: this.createValue
      };

      this.dispatchClusterCreate(data);

      this.selectClusterCreate();
    }
  }

  onEdit(cluster: any) {
    cluster.isEdit = !cluster.isEdit;

    if (cluster.isEdit === false) {
      this.selectClusterGetAll();
    }
  }

  onSaveUpdate(cluster: any) {
    if (cluster.ClusterName.trim().length > 0) {
      const data: ClusterUpdateReq = {
        ClusterId: cluster.ClusterId,
        ClusterName: cluster.ClusterName
      };

      this.dispatchClusterUpdate(data);

      cluster.isEdit = false;
    }
  }
}
