import { Component, inject, OnInit } from "@angular/core";

import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { SectionLineClusterComponent } from "./containers";
import { finalize, takeUntil } from "rxjs";
import { LineRes } from "~src/app/stored/line/models";
import { LoaderService } from "~src/app/services/loader.service";
import { IAppState } from "~src/app/stored/app.state";
import { Store } from "@ngrx/store";
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";
import { BlockSkeletonComponent } from "~src/app/shared/components";

@Component({
  selector: "line-cluster-products-page",
  templateUrl: "./line-cluster-products.component.html",
  styleUrls: ["./line-cluster-products.component.scss"],
  standalone: true,
  imports: [SectionLineClusterComponent, BlockSkeletonComponent],
  providers: []
})
export class LineClusterProductsPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  lineList: any[];

  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);

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
          this.lineList = result;
        }
      });
  }

  //#endregion
}
