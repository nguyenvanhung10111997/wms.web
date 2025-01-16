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
  ProductCreateReq,
  ProductRes,
  ProductUpdateReq
} from "~src/app/stored/product/models";
import * as productActions from "~stored/product/state/product.action";
import * as productSelectors from "~stored/product/state/product.selector";
import { DialogDeleteProductComponent } from "./dialogs/delete/delete.component";
import { FormsModule, NgModel } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: "product-page",
  templateUrl: "product.component.html",
  styleUrls: ["./product.component.scss"],
  standalone: true,
  imports: [TableModule, ButtonModule, FormsModule, NgClass]
})
export class ProductPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  productList: ProductRes[];
  productCodeValue: string = "";
  productNameValue: string = "";
  @ViewChild("productCode") productCode!: NgModel;
  @ViewChild("productName") productName!: NgModel;

  private _breakpoints = inject(BreakpointService);
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);
  private _route = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.dispatchProductGetAll();
    this.selectProductGetAll();
  }

  //#region  Select All Lines

  dispatchProductGetAll() {
    this._store.dispatch(
      new productActions.GetAllAction({
        param: {},
        source: ""
      })
    );
  }

  selectProductGetAll() {
    this._store
      .select(productSelectors.getAllError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.productList = [];
        }
      });

    this._store
      .select(productSelectors.getAllSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: ProductRes[]; source: string }) => {
        if (response && response.data) {
          this._loader.hide();
          const result = response.data;

          this.productList = result.map(item => ({
            ...item,
            isEdit: false
          }));
        }
      });
  }

  //#endregion

  //#region  Create Product

  dispatchProductCreate(data: ProductCreateReq) {
    this._store.dispatch(
      new productActions.CreateAction({
        param: data,
        source: ""
      })
    );
  }

  selectProductCreate() {
    this._store
      .select(productSelectors.createError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(productSelectors.createSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.productCodeValue = "";
          this.productNameValue = "";
          this.productCode.reset();
          this.productName.reset();

          this.dispatchProductGetAll();
        }
      });
  }

  //#endregion

  //#region  Update Lines

  dispatchProductUpdate(data: ProductUpdateReq) {
    this._store.dispatch(
      new productActions.UpdateAction({
        param: data,
        source: ""
      })
    );
  }

  selectProductUpdate() {
    this._store
      .select(productSelectors.updateError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(productSelectors.updateSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.dispatchProductGetAll();
        }
      });
  }

  //#endregion

  onCreate() {
    if (this.productCodeValue && this.productNameValue) {
      const data: ProductCreateReq = {
        ProductCode: this.productCodeValue,
        ProductName: this.productNameValue
      };

      console.log(1);

      this.dispatchProductCreate(data);

      this.selectProductCreate();
    }
  }

  onEdit(product: any) {
    product.isEdit = !product.isEdit;

    if (product.isEdit === false) {
      this.selectProductGetAll();
    }
  }

  onSaveUpdate(product: any) {
    if (
      product.ProductName.trim().length > 0 &&
      product.ProductCode.trim().length > 0
    ) {
      const data: ProductUpdateReq = {
        ProductId: product.ProductId,
        ProductCode: product.ProductCode,
        ProductName: product.ProductName
      };

      this.dispatchProductUpdate(data);

      product.isEdit = false;
    }
  }

  openDeleteDialog(productID: number, productName: string) {
    const dialog = this._dialog.open(DialogDeleteProductComponent, {
      closeOnNavigation: true,
      restoreFocus: true,
      data: {
        productID: productID,
        productName: productName
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result && result?.success) {
        this.dispatchProductGetAll();
      }
    });
  }
}
