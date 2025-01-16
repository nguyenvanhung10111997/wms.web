export interface LineClusterProductSearchMetricRes {
  lineID: number;
  lineName: string;
  clusters: LineClusterProductSearchMetricClusterInfoRes[];
}

interface LineClusterProductSearchMetricClusterInfoRes {
  lineID: number;
  clusterId: number;
  clusterName: string;
  productId: number;
  productCode: string;
  productName: string;
  totalTargetQuantity: number;
  totalActualQuantity: number;
  totalPrevActualQuantity: number;
  details: LineClusterProductSearchMetricClusterDetailInfoRes[];
}

interface LineClusterProductSearchMetricClusterDetailInfoRes {
  staticShiftId: number;
  staticShiftName: string;
  startTime: string;
  endTime: string;
  targetQuantity: number;
  prevActualQuantity: number;
  actualQuantity: number;
}
