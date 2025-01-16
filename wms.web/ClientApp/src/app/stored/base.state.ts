export interface IBaseState{
    data: any;
    selected: any;
    action: string | null;
    done: boolean;
    error?: Error | null;
    source?: string;
}
