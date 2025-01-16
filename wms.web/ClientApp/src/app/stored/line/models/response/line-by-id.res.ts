export interface ILineByID {
  LineId: number;
  LineName: string;
  Clusters: {
    ClusterId: number;
    ClusterName: string;
  }[];
  CreatedUser: string;
  CreatedDate: string;
  UpdatedUser: string;
  UpdatedDate: string;
}
