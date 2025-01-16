export interface LineClusterProductUpdateReq {
  Id: number;
  LineId: number;
  ClusterId: number;
  ProductId: number;
  StaticShiftId: number;
  FixedStartTime: string;
  FixedEndTime: string;
  TargetQuantity: number;
}
