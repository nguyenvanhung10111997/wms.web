export interface OrderCreateReq {
  OrderCode: string;
  CustomerName: string;
  BeginDate: string;
  EndDate: string;
  TotalTargetQuantity: number;
  TotalWorkers: number;
  TotalAmount: number;
  OrderDetail: {
    ProductCode: string;
    LineId: number;
    ClusterIds: number[];
  };
}

export interface OrderUpdateReq {
  OrderId: number;
  OrderCode: string;
  TotalWorkers: number;
}

export interface SearchMetricseReq {
  LineIds: number[];
  RequestDate: string;
  PageSize: number;
  PageIndex: number;
}

export interface OrderUpdateQuantityReq {
  OrderId: number;
  TotalTargetQuantity: number;
  Details: {
    StaticShiftId: number;
    TargetQuantity: number;
  }[];
}
