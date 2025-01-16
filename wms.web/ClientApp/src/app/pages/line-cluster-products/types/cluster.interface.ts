export interface Cluster {
    LineID: number;
    ClusterId: number;
    ClusterName: string;
    ProductId: number;
    ProductCode: string;
    ProductName: string;
    TotalTargetQuantity: number;
    TotalActualQuantity: number;
    TotalPrevActualQuantity: number;
    Details: Detail[];
  }

  export interface Detail {
    Id?: number;
    StaticShiftId: number;
    StaticShiftName: string;
    StartTime: string;
    EndTime: string;
    TargetQuantity: number;
    PrevActualQuantity: number;
    ActualQuantity: number;
  }
  
  