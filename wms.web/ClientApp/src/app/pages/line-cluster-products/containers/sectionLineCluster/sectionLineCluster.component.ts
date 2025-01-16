import { DecimalPipe, NgClass } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subject,
  takeUntil
} from "rxjs";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import { StaticShiftRes } from "~src/app/stored/static-shift/models";
import * as staticShiftActions from "~stored/static-shift/state/static-shift.action";
import * as staticShiftSelectors from "~stored/static-shift/state/static-shift.selector";

import * as ordersActions from "~stored/orders/state/orders.action";
import * as ordersSelectors from "~stored/orders/state/orders.selector";

import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { PanelModule } from "primeng/panel";
import { DialogService } from "primeng/dynamicdialog";
import { ToastModule } from "primeng/toast";
import { ToastService } from "~src/app/services/toast.service";
import { FormatMoneyPipe } from "~src/app/shared/pipes/format-money.pipe";
import { IconAddTableComponent } from "~src/app/shared/components/icon/icon-add-table/icon-add-table.component";
import { IOrderByIDRes } from "~src/app/stored/orders/models";
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";
import { DialogCreateOrderComponent } from "../../dialogs/create/create.component";
import { ILineByID } from "~src/app/stored/line/models";
import { BlockSkeletonComponent } from "~src/app/shared/components";
import {
  OrderUpdateQuantityReq,
  OrderUpdateReq
} from "~src/app/stored/orders/models/request/orders.req";
import { OrderUpdateStatusReq } from "~src/app/stored/orders/models/request/update-status";
import { InputNumberModule } from "primeng/inputnumber";
import { MatDialog } from "@angular/material/dialog";
import { DialogUpdateStatusOrderComponent } from "../../dialogs/update-status-order/update-status-order.component";
@Component({
  selector: "app-section-line-cluster",
  templateUrl: "./sectionLineCluster.component.html",
  styleUrls: ["./sectionLineCluster.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    NgClass,
    DecimalPipe,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DialogCreateOrderComponent,
    IconAddTableComponent,
    ToastModule,
    FormatMoneyPipe,
    PanelModule,
    BlockSkeletonComponent,
    InputNumberModule
  ],
  providers: [DialogService, ToastService]
})
export class SectionLineClusterComponent extends UnsubscribeOnDestroyAdapter {
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private dialogService = inject(DialogService);

  @Input({ required: true }) lineID: number;

  constructor() {
    super();
  }

  listDataStaticShift: StaticShiftRes[] = [];
  lineReadById = [];
  clusterIdActive: number[] = [];
  clusterId: number[] = [];

  orderListTargetQuantity: any[] = [];

  newListData: any[];

  // Khai báo Subject để xử lý debounce
  private targetQuantityInput$ = new Subject<{
    orderId: number;
    shiftId: number;
  }>();

  private totalTargetQuantityInput$ = new Subject<{
    orderId: number;
  }>();

  formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JS tính từ 0 nên cần +1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  ngOnInit(): void {
    this.dispatchStaticShiftGetAll();
    this.selectStaticShiftGetAll();

    this.dispatchReadOrdersByLineID(this.lineID);
    this.selectReadOrdersByLineID();

    this.dispatchLineReadById(this.lineID);
    this.selectLineReadById();

    this.selectUpdatedStatusOrders();

    // Áp dụng debounceTime và subscribe để gọi hàm sau 500ms
    this.targetQuantityInput$
      .pipe(
        debounceTime(500), // Chờ 500ms trước khi phát ra giá trị
        distinctUntilChanged() // Chỉ phát khi giá trị thay đổi
      )
      .subscribe(({ orderId, shiftId }) => {
        this.onChangeTagetQuantity(orderId, shiftId);
      });

    this.totalTargetQuantityInput$
      .pipe(
        debounceTime(500), // Chờ 500ms trước khi phát ra giá trị
        distinctUntilChanged() // Chỉ phát khi giá trị thay đổi
      )
      .subscribe(({ orderId }) => {
        this.onChangeTotalTagetQuantity(orderId);
      });
  }

  //#region get order by line id
  dispatchReadOrdersByLineID(lineId: number) {
    this._store.dispatch(
      new ordersActions.GetOrdersByLineIDAction({
        lineID: lineId,
        source: lineId
      })
    );
  }

  selectReadOrdersByLineID() {
    this._store
      .select(ordersSelectors.getOrdersByLineIDError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          if (response.source === this.lineID) {
            this.newListData = [];
          }
        }
      });

    this._store
      .select(ordersSelectors.getOrdersByLineIDSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: IOrderByIDRes[]; source: number }) => {
        if (response && response.data) {
          if (response.source === this.lineID) {
            this.handleAfterGetDataByClusterID(response.data);
          }
        }
      });
  }

  handleAfterGetDataByClusterID(data: IOrderByIDRes[]) {
    const convertData = data.map(item => {
      return {
        lineId: this.lineID,
        ...item,
        isPoEdit: false,
        isTotalWorker: false,
        isUpdate: false,
        ProductCode: item.Details[0]?.ProductCode,
        Details: this.groupDataByClusterID(item.Details)
      };
    });

    this.orderListTargetQuantity = convertData.map(item => {
      const newArr = item.Details[0].Details.map(shift => {
        const targetQuantityPercent =
          (shift.TargetQuantity * 100) / item.TotalTargetQuantity;

        return {
          StaticShiftId: shift.StaticShiftId,
          TargetQuantity: shift.TargetQuantity,
          IsOvertime: shift.IsOvertime,
          TargetQuantityPercent: targetQuantityPercent
        };
      });

      return {
        OrderId: item.OrderId,
        TotalTargetQuantity: item.TotalTargetQuantity,
        Details: newArr,
        TotalTargetQuantityPercent: 100
      };
    });

    this.clusterIdActive = convertData.flatMap(order =>
      order.Details.map(cluster => cluster.ClusterId)
    );

    this.newListData = convertData;
  }

  groupDataByClusterID(data) {
    // Nhóm theo `ClusterName`
    const groupedByCluster = data.reduce((acc, cur) => {
      let cluster = acc.find(item => item.ClusterId === cur.ClusterId);

      if (!cluster) {
        cluster = {
          ClusterId: cur.ClusterId,
          ClusterName: cur.ClusterName,
          Details: []
        };
        acc.push(cluster);
      }

      // Thêm name vào Details
      cluster.Details.push({
        EndTime: cur.EndTime,
        Id: cur.Id,
        OrderId: cur.OrderId,
        ProductCode: cur.ProductCode,
        StartTime: cur.StartTime,
        StaticShiftId: cur.StaticShiftId,
        StaticShiftName: cur.StaticShiftName,
        TargetQuantity: cur.TargetQuantity,
        IsOvertime: cur.IsOvertime
      });

      return acc;
    }, []);

    groupedByCluster.sort((a, b) => a.ClusterId - b.ClusterId);

    return groupedByCluster;
  }

  //#endregion

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
          const result = response.data;
          this.handleAfterStaticShiftGetAllSuccess(result);
        }
      });
  }

  handleAfterStaticShiftGetAllSuccess(data: StaticShiftRes[]) {
    this.listDataStaticShift = data;
  }

  //#endregion static-shift/get-all

  openCreateOrderDialog(line) {
    const dialogRef = this.dialogService.open(DialogCreateOrderComponent, {
      header: "Khai báo đơn hàng",
      width: "70vw",
      //height: "70vw",
      //contentStyle: { overflow: "auto" },
      data: {
        line: line
      },
      modal: true,
      baseZIndex: 10000,
      maximizable: true
    });

    dialogRef.onClose.subscribe(data => {
      if (data && data?.result) {
        this.dispatchReadOrdersByLineID(line);
      }
    });
  }

  //#region  Update Order

  dispatchUpdateOrders(req: OrderUpdateReq) {
    this._store.dispatch(
      new ordersActions.UpdateAction({
        param: req,
        source: ""
      })
    );
  }

  selectUpdatedOrders(lineID: number) {
    this._store
      .select(ordersSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          console.log(response);
        }
      });

    this._store
      .select(ordersSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: IOrderByIDRes[]; source: number }) => {
        if (response && response.data) {
          this.dispatchReadOrdersByLineID(lineID);
        }
      });
  }

  onUpdateOrder(editStatus: "isPo" | "isTotalWorker", item: any) {
    const req: OrderUpdateReq = {
      OrderCode: item.OrderCode,
      OrderId: item.OrderId,
      TotalWorkers: item.TotalWorkers
    };

    this.dispatchUpdateOrders(req);
    this.selectUpdatedOrders(item.lineId);

    if (editStatus === "isPo") {
      item.isPoEdit = false;
    } else {
      item.isTotalWorker = false;
    }
  }

  //#endregion

  //#region  Update Quantity Order

  dispatchUpdateQuantityOrders(req: OrderUpdateQuantityReq) {
    this._store.dispatch(
      new ordersActions.UpdateQuantityAction({
        param: req,
        source: ""
      })
    );
  }

  selectUpdatedQuantityOrders() {
    this._store
      .select(ordersSelectors.updateQuantityError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(ordersSelectors.updateQuantitySuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: number }) => {
        if (response && response.data) {
          this.dispatchReadOrdersByLineID(this.lineID);
        }
      });
  }

  // Hàm gọi khi có sự kiện onInput của p-inputNumber
  onInputTagetQuantity(orderId: number, shiftId: number) {
    this.targetQuantityInput$.next({ orderId, shiftId });
  }

  //Thay đổi giá trị các khung
  onChangeTagetQuantity(orderId, staticShiftId) {
    /** Tính lại tổng */
    this.getOrderTargetQuantityById(orderId).TotalTargetQuantity =
      this.getOrderTargetQuantityById(orderId).Details.reduce((sum, item) => {
        return (sum += item.TargetQuantity);
      }, 0);

    const totalTargetQuantity =
      this.getOrderTargetQuantityById(orderId).TotalTargetQuantity;

    /** Tính lại phần trăm */
    this.getOrderTargetQuantityById(orderId).Details =
      this.getOrderTargetQuantityById(orderId)
        .Details.filter(
          item =>
            !item.IsOverTime || (item.IsOverTime && item.TargetQuantity > 0)
        )
        .map(item => {
          return {
            ...item,
            TargetQuantityPercent:
              item.TargetQuantityPercent !== 0 ||
              item.StaticShiftId === staticShiftId
                ? (item.TargetQuantity * 100) / totalTargetQuantity
                : 0
          };
        });
  }

  // Hàm gọi khi có sự kiện onInput của p-inputNumber
  onInputTotalTagetQuantity(orderId: number) {
    this.totalTargetQuantityInput$.next({ orderId });
  }

  //Thay đổi tổng giá trị các khung
  onChangeTotalTagetQuantity(orderId) {
    const totalTargetQuantity =
      this.getOrderTargetQuantityById(orderId).TotalTargetQuantity;

    /** Tính lại giá trị */
    this.getOrderTargetQuantityById(orderId).Details =
      this.getOrderTargetQuantityById(orderId).Details.map(item => {
        return {
          ...item,
          TargetQuantity:
            (totalTargetQuantity * item.TargetQuantityPercent) / 100
        };
      });
  }

  onUpdateQuantity(itemUpdate, itemOrder) {
    const req = this.getOrderTargetQuantityById(itemUpdate.OrderId);

    this.dispatchUpdateQuantityOrders({
      OrderId: req.OrderId,
      TotalTargetQuantity: req.TotalTargetQuantity,
      Details: req.Details.map(item => ({
        StaticShiftId: item.StaticShiftId,
        TargetQuantity: item.TargetQuantity
      }))
    });
    this.selectUpdatedQuantityOrders();

    itemOrder.isUpdate = false;
  }
  //#endregion Update Quantity Order

  //#region  Update Order

  dispatchLineReadById(param: number) {
    this._store.dispatch(
      new lineActions.ReadByIdAction({
        lineID: param,
        source: param
      })
    );
  }

  selectLineReadById() {
    this._store
      .select(lineSelectors.readByIdError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.lineReadById = [];
        }
      });

    this._store
      .select(lineSelectors.readByIdSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: ILineByID; source: string }) => {
        if (response && response?.data) {
          const result = [...response?.data?.Clusters];
          this.lineReadById = result;
          this.clusterId = result.map(item => item.ClusterId);
        }
      });
  }

  //#endregion

  findMissingClusterId(arr1, arr2) {
    return arr2.filter(element => !arr1.includes(element));
  }

  getOrderTargetQuantityById(id: number) {
    return this.orderListTargetQuantity.find(order => order.OrderId === id);
  }

  //#region  Update Status Order

  dispatchUpdateStatusOrders(req: OrderUpdateStatusReq) {
    this._store.dispatch(
      new ordersActions.UpdateStatusAction({
        param: req,
        source: ""
      })
    );
  }

  selectUpdatedStatusOrders() {
    this._store
      .select(ordersSelectors.updateStatusError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(ordersSelectors.updateStatusSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: number }) => {
        if (response && response.data) {
          this.dispatchReadOrdersByLineID(this.lineID);
        }
      });
  }

  dialog = inject(MatDialog);
  onOpenUpdateStatusOrder(OrderId: number, ProductCode: string) {
    const dialogRef = this.dialog.open(DialogUpdateStatusOrderComponent, {
      data: { OrderId: OrderId, ProductCode: ProductCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const req: OrderUpdateStatusReq = {
          OrderId: OrderId,
          StatusId: 3
        };

        this.dispatchUpdateStatusOrders(req);
      }
    });
  }

  //#endregion Update Status Order

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
    this.targetQuantityInput$.unsubscribe();
    this.totalTargetQuantityInput$.unsubscribe();
  }
}
