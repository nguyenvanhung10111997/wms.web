import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IClusterState extends IBaseState {}

export const initialClusterState: IClusterState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getClusterState = (state: IAppState) => state.cluster;
