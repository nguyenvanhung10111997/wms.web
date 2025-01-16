export interface LineClusterProductSearchMetricReq {
  LineIds?: number[];
  ClusterIds?: number[];
  StaticShiftIds?: number[];
  RequestDate: string;
  PageSize: number;
  PageIndex: number;
}
