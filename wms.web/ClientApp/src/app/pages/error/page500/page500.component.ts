import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "error-500-page",
  templateUrl: "./page500.component.html",
  styleUrls: ["./page500.component.scss"],
  standalone: true,
  imports: []
})
export class Page500Component implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  onNavigateToHome() {
    this.router.navigate(["/"]);
  }
}
