interface IClusterByOrderRes {
  Id: number;
  OrderId: number;
  ClusterId: number;
  ClusterName: string;
  ProductCode: string;
  StaticShiftId: number;
  StaticShiftName: string;
  StartTime: string;
  EndTime: string;
  TargetQuantity: number;
  IsOvertime: boolean;
}

export interface IOrderByIDRes {
  OrderId: number;
  OrderCode: string;
  CustomerName: string;
  BeginDate: string;
  EndDate: string;
  TotalTargetQuantity: number;
  TotalWorkers: number;
  TotalAmount: number;
  StatusId: number;
  StatusName: string;
  Details: IClusterByOrderRes[];
}
