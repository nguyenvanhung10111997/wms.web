import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "error-404-page",
  templateUrl: "./page404.component.html",
  styleUrls: ["./page404.component.scss"],
  standalone: true,
  imports: []
})
export class Page404Component implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  onNavigateToHome() {
    this.router.navigate(["/"]);
  }
}
