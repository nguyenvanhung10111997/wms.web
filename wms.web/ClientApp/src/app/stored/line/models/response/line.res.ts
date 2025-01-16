export interface LineRes {
  lineId: number;
  lineName: string;
}

export interface IStatisticRes {
  LineId: number;
  LineName: string;
  TotalTargetQuantity: number;
  TotalWorkers: number;
  TotalCurrentQuantity: number;
  TotalActualQuantity: number;
  Clusters: {
    LineId: number;
    ClusterId: number;
    ClusterName: string;
    TargetQuantity: number;
    ActualQuantity: number;
  }[];
}
