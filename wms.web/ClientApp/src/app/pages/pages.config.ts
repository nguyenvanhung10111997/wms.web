import { Routes } from "@angular/router";
import { Page500Component, Page503Component } from "./error";
import { AuthGuard } from "../auth/guards/auth.guard";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    canActivate: [AuthGuard],
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "manage-other",
    loadChildren: () =>
      import(
        "./product-line-balancing-management/product-line-balancing-management.config"
      ).then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "line-cluster-products",
    loadChildren: () =>
      import("./line-cluster-products/line-cluster-products.config").then(
        m => m.ROUTES
      )
  },
  {
    canActivate: [AuthGuard],
    path: "static-shifts",
    loadChildren: () =>
      import("./static-shifts/static-shifts.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "products",
    loadChildren: () => import("./product/product.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "lines",
    loadChildren: () => import("./lines/lines.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "clusters",
    loadChildren: () => import("./clusters/clusters.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "machines",
    loadChildren: () => import("./machines/machines.config").then(m => m.ROUTES)
  },
  {
    canActivate: [AuthGuard],
    path: "demo",
    loadChildren: () => import("./demo/demo.config").then(m => m.ROUTES)
  },
  /** Page 500 */
  {
    path: "page-500",
    component: Page500Component
  },
  /** Page 503 */
  {
    path: "page-503",
    component: Page503Component
  },
  /** Page Not Found */
  {
    path: "page-404",
    loadChildren: () =>
      import("./error/page404/page404.config").then(m => m.ROUTES)
  },
  {
    path: "page-403",
    loadChildren: () =>
      import("./error/page403/page403.config").then(m => m.ROUTES)
  },
  /** Page Not Found */
  { path: "**", redirectTo: "/page-404", pathMatch: "full" }
];
