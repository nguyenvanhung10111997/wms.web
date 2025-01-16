import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OverlayService {
  private isOverlaySubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isOverlay$ = this.isOverlaySubject.asObservable();
  htmlWrapperElement: any;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.htmlWrapperElement = this._document.querySelector("html");
  }

  onShowOverlay() {
    this.isOverlaySubject.next(true);
    this.htmlWrapperElement.style.overflow = "hidden";
  }

  onHiddenOverlay() {
    this.isOverlaySubject.next(false);
    this.htmlWrapperElement.style.overflow = "auto";
  }
}
