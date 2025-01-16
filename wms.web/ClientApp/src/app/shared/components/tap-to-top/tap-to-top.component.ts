import { Component } from "@angular/core";
import { NgStyle, ViewportScroller } from "@angular/common";
import { TapToTopDirective } from "../../directives/tap-to-top.directive";

@Component({
  selector: "app-tap-to-top",
  templateUrl: "./tap-to-top.component.html",
  styleUrls: ["./tap-to-top.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgStyle,

    /** Directives */
    TapToTopDirective
  ]
})
export class TapToTopComponent {
  constructor(private viewScroller: ViewportScroller) {}

  tapToTop() {
    this.viewScroller.scrollToPosition([0, 0]);
  }
}
