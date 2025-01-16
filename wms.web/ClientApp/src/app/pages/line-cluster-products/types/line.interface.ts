import { Cluster } from "./cluster.interface";

export interface Line {
    LineID: number;
    LineName: string;
    Clusters: Cluster[];
  }
  