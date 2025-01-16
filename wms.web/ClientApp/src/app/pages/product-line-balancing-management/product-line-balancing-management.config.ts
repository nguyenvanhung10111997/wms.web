import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { ManageOtherPageComponent } from "./product-line-balancing-management.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: ManageOtherPageComponent
      }
    ]
  }
];
