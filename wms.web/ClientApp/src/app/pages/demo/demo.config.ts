import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main/main.component";
import { FileUploadPageComponent } from "./file-upload/file-upload.component";
import { CkeditorPageComponent } from "./ckeditor/ckeditor.component";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "ckeditor",
    pathMatch: "full"
  },
  {
    path: "file-upload",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: FileUploadPageComponent
      }
    ]
  },
  {
    path: "ckeditor",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        component: CkeditorPageComponent
      }
    ]
  }
];
