export class LineReadClusterRes {
  lineId: number;
  lineName: string;
  clusters: LineClusterInfo[];
}

export class LineClusterInfo {
  clusterId: number;
  clusterName: string;
  productId: number;
  productCode: string;
  totalTargetQuantity: number;
  totalActualQuantity: number;
  details: LineClusterProductDetailInfo[];
}

export class LineClusterProductDetailInfo {
  clusterId: number;
  productId: number;
  staticShiftId: number;
  staticShiftName: string;
  startTime: string;
  endTime: string;
  targetQuantity: number;
  actualQuantity: number;
}
