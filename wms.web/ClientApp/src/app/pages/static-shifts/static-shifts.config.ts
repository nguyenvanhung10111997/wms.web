import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { StaticShiftsComponent } from "./static-shifts.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: StaticShiftsComponent
      }
    ]
  }
];
