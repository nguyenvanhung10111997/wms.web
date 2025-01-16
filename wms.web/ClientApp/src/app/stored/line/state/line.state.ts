import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface ILineState extends IBaseState {}

export const initialLineState: ILineState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getLineState = (state: IAppState) => state.line;
