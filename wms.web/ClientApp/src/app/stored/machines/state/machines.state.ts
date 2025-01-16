import { IAppState } from "~src/app/stored/app.state";
import { IBaseState } from "~src/app/stored/base.state";

export interface IMachinesState extends IBaseState {}

export const initialMachinesState: IMachinesState = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
  source: null
};

export const getMachinesState = (state: IAppState) => state.machines;
