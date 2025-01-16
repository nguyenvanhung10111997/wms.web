export interface LineClusterProductCreateReq {
  LineId: number;
  ClusterId: number;
  ProductId: number;
  StaticShiftId: number;
  FixedStartTime: string;
  FixedEndTime: string;
  TargetQuantity: number;
}
