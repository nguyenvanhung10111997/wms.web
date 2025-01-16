import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { MachinesPageComponent } from "./machines.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: MachinesPageComponent
      }
    ]
  }
];
