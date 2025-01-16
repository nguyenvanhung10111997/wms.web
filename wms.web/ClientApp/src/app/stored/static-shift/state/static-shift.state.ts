import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IStaticShiftState extends IBaseState {}

export const initialStaticShiftState: IStaticShiftState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getStaticShiftState = (state: IAppState) => state.staticShift;
