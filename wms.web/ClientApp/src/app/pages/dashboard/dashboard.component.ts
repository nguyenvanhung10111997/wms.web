import { DecimalPipe, NgClass, NgStyle } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { finalize, takeUntil } from "rxjs";
import { LoaderService } from "~src/app/services/loader.service";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";
import { IAppState } from "~src/app/stored/app.state";
import { IStatisticRes } from "~src/app/stored/line/models";
import * as lineActions from "~stored/line/state/line.action";
import * as lineSelectors from "~stored/line/state/line.selector";
import * as moment from "moment-timezone";

@Component({
  selector: "dashboard-page",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: true,
  imports: [NgStyle, NgClass, DecimalPipe]
})
export class DashboardPageComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private _store = inject(Store<IAppState>);
  private _loader = inject(LoaderService);

  randomColors: string[] = [
    "#98d9eb",
    "#fdc0bb",
    "#fef979",
    "#eee4b1",
    "#b6f1af",
    "#f8c0dd",
    "#bcc7fd",
    "#d0febe",
    "#fdf2ba",
    "#bafffc",
    "#fdc8fc",
    "#ffebca",
    "#caffd3",
    "#f1ffdc",
    "#e3e0ff",
    "#c0fcfd"
  ];

  listStatistic: IStatisticRes[] | any[];
  intervalId: any;

  ngOnInit(): void {
    const currentDate = new Date();
    // const utc7Date = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
    // const isoString = utc7Date.toISOString();
    this.dispatchReadOrdersByLineID(moment().format("YYYY-MM-DD HH:mm:ss"));
    this.selectReadOrdersByLineID();

    this.intervalId = setInterval(() => {
      this.dispatchReadOrdersByLineID(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 30000); // 30000 ms = 30 giây
  }

  //#region get  Statistic
  dispatchReadOrdersByLineID(requestTime: string) {
    this._store.dispatch(
      new lineActions.ReadStatisticAction({
        param: { RequestTime: requestTime },
        source: ""
      })
    );
  }

  selectReadOrdersByLineID() {
    this._store
      .select(lineSelectors.readClustersError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response && response.error) {
          this._loader.hide();
          this.listStatistic = [];
        }
      });

    this._store
      .select(lineSelectors.readStatisticSuccess)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loader.hide();
        })
      )
      .subscribe((response: { data: IStatisticRes[]; source?: string }) => {
        if (response && response.data) {
          this.listStatistic = response.data
            .map((item, index) => {
              const backgroundColor =
                this.randomColors[index % this.randomColors.length];

              return {
                ...item,
                backgroundColor
              };
            })
            .sort((a, b) => a.LineId - b.LineId);
        }
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.intervalId);
  }
}
