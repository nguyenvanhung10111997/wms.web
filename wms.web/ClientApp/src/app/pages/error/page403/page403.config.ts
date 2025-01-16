import { Routes } from "@angular/router";
import { MainLayoutComponent } from "~src/app/layouts/main/main.component";
import { Page403Component } from "./page403.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: Page403Component
      }
    ]
  }
];
