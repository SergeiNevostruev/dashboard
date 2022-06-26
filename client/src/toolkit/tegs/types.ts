export interface TegType  {
  id: number;
  teg: string;
  change?: boolean;
}

export type TegsReducerType = TegType[];
export interface TegsReducerTypeStore {
  loading: boolean,
  error: boolean,
  tegs: TegsReducerType,
  usertegs: string,
  data: any,
  userdata: any,
  count: number,
  searchPage: {1: string, 2: string},
  searchProduct: string,
  userdatapage: number
}


