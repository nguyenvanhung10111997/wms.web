import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { LinesPageComponent } from "./lines.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: LinesPageComponent
      }
    ]
  }
];
