import { Component, OnInit } from "@angular/core";
import { OverlayService } from "../../../services/overlay.service";
import { UnsubscribeOnDestroyAdapter } from "../../UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
  standalone: true,
  imports: []
})
export class OverlayComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  isOverlay: boolean;
  constructor(public _overlayService: OverlayService) {
    super();
  }

  ngOnInit(): void {
    this.subs.sink = this._overlayService.isOverlay$.subscribe(result => {
      this.isOverlay = result;
    });
  }

  ngOnDestroy(): void {
    this._overlayService.onHiddenOverlay();
  }
}
