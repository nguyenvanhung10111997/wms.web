import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "error-403-page",
  templateUrl: "./page403.component.html",
  styleUrls: ["./page403.component.scss"],
  standalone: true,
  imports: []
})
export class Page403Component implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  onNavigateToHome() {
    this.router.navigate(["/"]);
  }
}
