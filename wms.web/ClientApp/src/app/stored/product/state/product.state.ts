import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IProductState extends IBaseState {}

export const initialProductState: IProductState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getProductState = (state: IAppState) => state.product;
