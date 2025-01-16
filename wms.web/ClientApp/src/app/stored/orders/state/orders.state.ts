import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IOrdersState extends IBaseState {}

export const initialOrdersState: IOrdersState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getOrdersState = (state: IAppState) => state.orders;
