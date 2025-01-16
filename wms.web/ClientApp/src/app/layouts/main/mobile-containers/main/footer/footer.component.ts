import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UnsubscribeOnDestroyAdapter } from "~src/app/shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: "mobile-footer-main-layout",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MobileFooterMainLayoutComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{

  constructor() {
    super();
  }

  ngOnInit(): void {
    
  }
}
