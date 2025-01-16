import { Component } from "@angular/core";
import { UnsubscribeOnDestroyAdapter } from "../../UnsubscribeOnDestroyAdapter";
import { LoadingSpinnerService } from "~src/app/services/loading-spinner.service";
@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
  standalone: true
})
export class LoadingSpinnerComponent extends UnsubscribeOnDestroyAdapter {
  showLoading: boolean = false;

  constructor(private _loadingSpinnerService: LoadingSpinnerService) {
    super();
    this.subs.sink = this._loadingSpinnerService.loading$.subscribe(
      isLoading => {
        this.showLoading = isLoading ?? false;
      }
    );
  }
}
