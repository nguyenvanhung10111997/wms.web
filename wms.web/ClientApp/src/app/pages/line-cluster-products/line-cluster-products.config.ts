import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { LineClusterProductsPageComponent } from "./line-cluster-products.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: LineClusterProductsPageComponent
      }
    ]
  }
];
