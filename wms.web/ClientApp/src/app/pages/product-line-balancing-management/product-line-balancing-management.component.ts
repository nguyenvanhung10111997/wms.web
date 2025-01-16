import { CurrencyPipe, DecimalPipe, NgClass } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { BaseImageComponent } from "~src/app/shared/components";
import { FileUploadComponent } from "~src/app/shared/components/file-upload/file-upload.component";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { finalize, takeUntil } from "rxjs";
import * as lineClusterProductActions from "~stored/line-cluster-product/state/line-cluster-product.action";
import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";
import { StaticShiftRes } from "~src/app/stored/static-shift/models";
import { MatDialog } from "@angular/material/dialog";
import {
  BreakpointService,
  Breakpoints
} from "~src/app/services/breakpoint.service";
import { IAppState } from "~src/app/stored/app.state";
import { Store } from "@ngrx/store";
import { LoaderService } from "~src/app/services/loader.service";
import * as ordersActions from "~stored/orders/state/orders.action";
import * as ordersSelectors from "~stored/orders/state/orders.selector";

import { SearchMetricseReq } from "~src/app/stored/orders/models/request/orders.req";
import { SearchMetricsRes } from "~src/app/stored/orders/models/response/order.res";
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";
import { LineRes } from "~src/app/stored/line/models";
import * as moment from "moment-timezone";
@Component({
  selector: "product-line-balancing-management-page",
  templateUrl: "./product-line-balancing-management.component.html",
  styleUrls: ["./product-line-balancing-management.component.scss"],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    /** Containers */
    /** Mobile Containers */
    /** Directive */
    /** Components */
    FileUploadComponent,
    BaseImageComponent,
    DecimalPipe,

    /** Others */
    TableModule,

    /** Pipes */
    CurrencyPipe,
    DecimalPipe
  ]
})
export class ManageOtherPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);
  constructor() {
    super();
  }

  breakpoints: Breakpoints;
  isLoading = false;
  lineClusterProductSearchMetric = [];
  listDataStaticShift: StaticShiftRes[] = [];

  dateParam: string;

  lineIdList: number[];
  newDataList: any[];
  intervalValid: any;

  ngOnInit(): void {
    this.subs.sink = this._breakpoints.breakpointsResult$.subscribe(
      observer => {
        this.breakpoints = observer;
      }
    );

    this._route.queryParams.subscribe(params => {
      this.dateParam = params["date"];
    });

    this.selectStaticShiftGetAll();
    this.dispatchStaticShiftGetAll();

    this.dispatchLineGetAll();
    this.selectLineGetAll();
    this.selectOrderSearchMetrics();
  }

  //#region static-shift/get-all
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
          this.isLoading = false;
          this.listDataStaticShift = [];
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

          this.listDataStaticShift = response.data;
        }
      });
  }

  //#endregion static-shift/get-all

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
          this.lineIdList = [];
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

          this.handleAfterGetLineId(result);
        }
      });
  }

  handleAfterGetLineId(result: any[]) {
    if (result) {
      this.lineIdList = result.map(item => item.LineId);

      //const currentDate = new Date();
      //const isoString = currentDate.toISOString();

      this.dispatchOrderSearchMetrics({
        LineIds: this.lineIdList,
        RequestDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        PageSize: -1,
        PageIndex: -1
      });

      this.intervalValid = setInterval(() => {
        this.dispatchOrderSearchMetrics({
          LineIds: this.lineIdList,
          RequestDate: moment().format("YYYY-MM-DD HH:mm:ss"),
          PageSize: -1,
          PageIndex: -1
        });
      }, 30000);
    }
  }

  //#endregion

  //#region Order Search Metrics
  dispatchOrderSearchMetrics(req: SearchMetricseReq) {
    this._store.dispatch(
      new ordersActions.SearchMetricsAction({
        param: req,
        source: ""
      })
    );
  }

  selectOrderSearchMetrics() {
    this._store
      .select(ordersSelectors.searchMetricsError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.isLoading = false;
        }
      });

    this._store
      .select(ordersSelectors.searchMetricsSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: SearchMetricsRes; source: string }) => {
        if (response && response.data) {
          this._loader.hide();

          this.newDataList = this.convertData(response.data.Records);
        }
      });
  }

  //#endregion

  convertData(A) {
    return A.flatMap(line => {
      // Kiểm tra nếu line.Clusters tồn tại, nếu không thì trả về mảng rỗng []
      return (
        (line.Clusters || [])
          .map(cluster => {
            // Xây dựng đối tượng cha với thông tin từ Line
            const parent = {
              LineId: line.LineId,
              LineName: line.LineName,
              ProductCode: cluster.ProductCode,
              TotalTargetQuantity: cluster.TotalTargetQuantity,
              TotalActualQuantity: cluster.TotalActualQuantity
            };

            // Tạo đối tượng chuyển đổi cho từng cluster
            return {
              LineID: line.LineId,
              ClusterId: cluster.ClusterId,
              ClusterName: cluster.ClusterName,
              ProductId: cluster.ProductCode || null, // Nếu không có ProductId, mặc định là null
              ProductCode: cluster.ProductCode,
              ProductName: cluster.ProductCode,
              TotalTargetQuantity: cluster.TotalTargetQuantity,
              TotalActualQuantity: cluster.TotalActualQuantity,
              TotalPrevActualQuantity: cluster.TotalPrevActualQuantity || 0,

              // Kiểm tra nếu cluster.Details tồn tại, nếu không thì trả về mảng rỗng []
              Details: (cluster.Details || []).map(detail => ({
                StaticShiftId: detail.StaticShiftId,
                StaticShiftName: detail.StaticShiftName,
                StartTime: detail.StartTime,
                EndTime: detail.EndTime,
                TargetQuantity: detail.TargetQuantity,
                PrevActualQuantity: detail.PrevActualQuantity || 0,
                ActualQuantity: detail.ActualQuantity
              })),

              parent,

              // Kiểm tra nếu cluster.StaticShifts tồn tại, nếu không thì trả về mảng rỗng []
              StaticShifts: (cluster.Details || []).map(shift => ({
                StaticShiftId: shift.StaticShiftId,
                StaticShiftName: shift.StaticShiftName,
                StartTime: shift.StartTime,
                EndTime: shift.EndTime,
                TargetQuantity: shift.TargetQuantity,
                PrevActualQuantity: shift.PrevActualQuantity || 0,
                ActualQuantity: shift.ActualQuantity
              }))
            };
          })
          // Sắp xếp các cluster theo ClusterId
          .sort((a, b) => a.ClusterId - b.ClusterId)
      );
    });
  }

  ngOnDestroy(): void {
    this._store.dispatch(new lineClusterProductActions.ResetAction());
    this._store.dispatch(new staticShiftActions.ResetAction());
    this.subs?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.intervalValid);
  }
}
