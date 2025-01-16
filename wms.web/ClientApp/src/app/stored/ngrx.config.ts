import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import {
  LineService,
  LineEffect,
  reducer as reducerLine
} from "src/app/stored/line";

import {
  StaticShiftService,
  StaticShiftEffect,
  reducer as reducerStaticShift
} from "src/app/stored/static-shift";

import {
  LineClusterProductService,
  LineClusterProductEffect,
  reducer as reducerLineClusterProduct
} from "src/app/stored/line-cluster-product";

import {
  ClusterService,
  ClusterEffect,
  reducer as reducerCluster
} from "src/app/stored/cluster";

import {
  ProductService,
  ProductEffect,
  reducer as reducerProduct
} from "src/app/stored/product";

import {
  MachinesService,
  MachinesEffect,
  reducer as reducerMachines
} from "src/app/stored/machines";

import {
  OrdersService,
  OrdersEffect,
  reducer as reducerOrders
} from "src/app/stored/orders";

export const NgrxConfig: ApplicationConfig = {
  providers: [
    LineService,
    LineClusterProductService,
    StaticShiftService,
    ClusterService,
    ProductService,
    MachinesService,
    OrdersService,
    provideStore({
      line: reducerLine,
      lineClusterProduct: reducerLineClusterProduct,
      staticShift: reducerStaticShift,
      cluster: reducerCluster,
      product: reducerProduct,
      machines: reducerMachines,
      orders: reducerOrders
    }),
    provideEffects([
      LineEffect,
      LineClusterProductEffect,
      StaticShiftEffect,
      ClusterEffect,
      ProductEffect,
      MachinesEffect,
      OrdersEffect
    ])
    //provideStoreDevtools({
    //  maxAge: 25, // Retains last 25 states
    //  logOnly: !isDevMode(), // Restrict extension to log-only mode
    //  autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    //  trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    //  traceLimit: 75 // maximum stack trace frames to be stored (in case trace option was provided as true)
    //})
  ]
};
