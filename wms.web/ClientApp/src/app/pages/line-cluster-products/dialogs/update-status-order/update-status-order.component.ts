import { Component, inject, Inject, OnInit } from "@angular/core";
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
  MatDialogActions,
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
  selector: "update-status-order.component",
  templateUrl: "./update-status-order.component.html",
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
    DynamicDialogModule,
    MatDialogActions
  ],
  providers: [provideNativeDateAdapter()]
})
export class DialogUpdateStatusOrderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  readonly dialogRef = inject(MatDialogRef<DialogUpdateStatusOrderComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor() {
    super();
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAgreeClick(): void {
    this.dialogRef.close({ result: true });
  }
}
