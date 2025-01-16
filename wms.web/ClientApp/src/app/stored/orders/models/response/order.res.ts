export interface SearchMetricsRes {
  StatusCode: number;
  ErrorMessage: string;
  TotalRecord: number;
  PageIndex: number;
  PageSize: number;
  Records: {
    LineId: number;
    LineName: string;
    Clusters: {
      LineId: number;
      OrderId: number;
      OrderCode: string;
      ClusterId: number;
      ClusterName: string;
      ProductCode: string;
      TotalTargetQuantity: number;
      TotalActualQuantity: number;
      TotalPrevActualQuantity: number;
      Details: {
        StaticShiftId: number;
        StaticShiftName: string;
        StartTime: string;
        EndTime: string;
        TargetQuantity: number;
        PrevActualQuantity: number;
        ActualQuantity: number;
      }[];
    };
  };
}
