import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-block-skeleton",
  templateUrl: "./block-skeleton.component.html",
  styleUrls: ["./block-skeleton.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgStyle
  ]
})
export class BlockSkeletonComponent {
  @Input() theme: NgStyle;
}
