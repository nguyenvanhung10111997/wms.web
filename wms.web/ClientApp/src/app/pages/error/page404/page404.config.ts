import { Routes } from "@angular/router";
import { MainLayoutComponent } from "~src/app/layouts/main/main.component";
import { Page404Component } from "./page404.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: Page404Component
      }
    ]
  }
];
