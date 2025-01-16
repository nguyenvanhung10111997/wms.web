import { Component } from "@angular/core";
import { Breakpoints } from "~src/app/services/breakpoint.service";
@Component({
  selector: "home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [],
  providers: []
})
export class HomePageComponent {
  breakpoints: Breakpoints;
}
