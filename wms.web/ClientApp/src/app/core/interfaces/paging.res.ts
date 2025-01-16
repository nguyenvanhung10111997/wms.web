export interface PagingResponse<T> {
  StatusCode: number;
  ErrorMessage: string;
  TotalRecord: number;
  CurrentPageIndex: number;
  PageSize: number;
  Records: [T];
}
