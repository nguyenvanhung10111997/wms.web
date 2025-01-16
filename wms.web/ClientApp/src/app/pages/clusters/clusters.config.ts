import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { ClustersPageComponent } from "./clusters.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: ClustersPageComponent
      }
    ]
  }
];
