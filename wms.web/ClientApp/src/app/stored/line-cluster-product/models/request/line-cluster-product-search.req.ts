export interface LineClusterProductSearchReq {
  KeySearch: string;
  LineIds?: number[];
  ClusterIds?: number[];
  StaticShiftIds?: number[];
  PageSize: number;
  PageIndex: number;
}
