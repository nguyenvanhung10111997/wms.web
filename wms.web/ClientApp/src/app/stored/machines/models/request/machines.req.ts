export interface MachinesCreateReq {
  MachineName: string;
  ClusterId?: number;
  IsSum: boolean;
 }


export interface MachinesUpdateReq {
  MachineId: number;
  MachineName: string;
  ClusterId?: number;
  IsSum: boolean;
 }

