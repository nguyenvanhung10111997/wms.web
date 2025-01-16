import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UnsubscribeOnDestroyAdapter } from "../shared/UnsubscribeOnDestroyAdapter";

@Injectable({
  providedIn: "root"
})
export class LoadingSpinnerService extends UnsubscribeOnDestroyAdapter {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() {
    super();
  }

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
