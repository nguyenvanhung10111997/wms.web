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
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";

@Component({
  selector: "dialog-delete-line",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  standalone: true,
  imports: [MatDialogContent, ReactiveFormsModule]
})
export class DialogDeleteLinesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _loader: LoaderService,
    public DialogDeleteLinesComponent: MatDialogRef<DialogDeleteLinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | undefined
  ) {
    super();
  }

  ngOnInit(): void {}

  //#region  Create Lines

  dispatchLineDelete(LineID: number) {
    this._store.dispatch(
      new lineActions.DeleteAction({
        param: LineID,
        source: ""
      })
    );
  }

  selectLineDelete() {
    this._store
      .select(lineSelectors.deleteError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
        }
      });

    this._store
      .select(lineSelectors.deleteSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: boolean; source: string }) => {
        if (response && response.data) {
          this.DialogDeleteLinesComponent.close({
            success: response.data
          });
        }
      });
  }

  //#endregion

  onDelete(event: Event) {
    if (this.data?.lineID !== 0) {
      this.dispatchLineDelete(this.data.lineID);

      this.selectLineDelete();
    }
  }


  onNoClick(): void {
    this.DialogDeleteLinesComponent.close();
  }
}
