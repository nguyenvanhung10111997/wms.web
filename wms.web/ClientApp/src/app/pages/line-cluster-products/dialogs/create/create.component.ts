import { Component, Inject, OnInit } from "@angular/core";
import { CalendarModule } from "primeng/calendar";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";

import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { TreeSelectModule } from "primeng/treeselect";
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef
} from "primeng/dynamicdialog";

import * as ordersActions from "~stored/orders/state/orders.action";
import * as ordersSelectors from "~stored/orders/state/orders.selector";
import { OrderCreateReq } from "~src/app/stored/orders/models/request/orders.req";
import { finalize, takeUntil } from "rxjs";
import * as moment from "moment-timezone";

@Component({
  selector: "dialog-create-product",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    TreeSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    TableModule,
    CalendarModule,
    FormsModule,
    DynamicDialogModule
  ],
  providers: [provideNativeDateAdapter()]
})
export class DialogCreateOrderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  nodes = [
    {
      id: "1",
      label: "Cụm 1"
    },
    {
      id: "2",
      label: "Cụm 2"
    },
    {
      id: "3",
      label: "Cụm 3"
    },
    {
      id: "4",
      label: "Cụm 4"
    }
  ];

  products = [
    {
      id: "1000",
      line: "chuyền 1",
      clusters: [
        { name: "cụm 1", code: "NY" },
        { name: "cụm 2", code: "RM" }
      ]
    },
    {
      id: "1000",
      line: "chuyền 2",
      clusters: [
        { name: "cụm 1", code: "NY" },
        { name: "cụm 2", code: "RM" }
      ]
    }
  ];

  line: any;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public lose: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super();
  }
  formCreate: FormGroup;
  ngOnInit(): void {
    this.line = this.config?.data?.line;

    this.formCreate = this._fb.group({
      orderCode: ["", Validators.required],
      productCode: ["", Validators.required],
      customerName: ["", Validators.required],
      totalTargetQuantity: ["", Validators.required],
      numberOfWorker: ["", Validators.required],
      unitPrice: ["", Validators.required],
      line: [{ value: this.line, disabled: true }], // readonly field
      productionCluster: [null], // for tree select component
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.selectOrderCreate();
  }

  //#region  Create
  dispatchOrderCreate(data: OrderCreateReq) {
    this._store.dispatch(
      new ordersActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectOrderCreate() {
    this._store
      .select(ordersSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(ordersSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.lose.close({ result: response.data });
        }
      });
  }

  //#endregion

  onSubmit() {
    if (this.formCreate.valid) {
      console.log(this.formCreate.value);

      const clusterIds = this.formCreate.controls[
        "productionCluster"
      ].value.map(cluster => cluster.id);

      this.dispatchOrderCreate({
        OrderCode: this.formCreate.controls["orderCode"].value,
        CustomerName: this.formCreate.controls["customerName"].value,
        BeginDate: this.convertToISOString(
          this.formCreate.controls["startDate"].value
        ),
        EndDate: this.convertToISOString(
          this.formCreate.controls["endDate"].value
        ),
        TotalTargetQuantity:
          this.formCreate.controls["totalTargetQuantity"].value,
        TotalWorkers: this.formCreate.controls["numberOfWorker"].value,
        TotalAmount: this.formCreate.controls["unitPrice"].value,
        OrderDetail: {
          ProductCode: this.formCreate.controls["productCode"].value,
          LineId: this.line,
          ClusterIds: clusterIds
        }
      });
    } else {
      console.log("Form không hợp lệ");
    }
  }

  convertToISOString(dateStr) {
    const date = new Date(dateStr); // Parse the date string
    moment(date).format("YYYY-MM-DD HH:mm:ss");
    //date.setUTCHours(15, 18, 19, 33); // Set specific time (optional)
    return moment(dateStr).format("YYYY-MM-DD HH:mm:ss");
  }
}
