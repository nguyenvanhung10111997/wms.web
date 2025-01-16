import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface ILineClusterProductState extends IBaseState {}

export const initialLineClusterProductState: ILineClusterProductState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getLineClusterProductState = (state: IAppState) =>
  state.lineClusterProduct;
