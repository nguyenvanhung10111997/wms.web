import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "safe-page",
  templateUrl: "./safe-page.component.html",
  styleUrls: ["./safe-page.component.scss"],
  standalone: true,
  imports: [
    /** Angular core */
    NgStyle
  ]
})
export class SafePageComponent {
  @Input() backgroundColor: string;
  @Input() padding: string;
  @Input() height: string;
}
