export interface IPhoto {
  name: string;
  priority: number;
}

export interface IPagedDataResponse<T> {
  data: T[];
  pagesAvailable: number;
  itemsAvailable: number;
}
