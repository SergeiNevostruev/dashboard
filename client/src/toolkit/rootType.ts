import { UserInfoReducerType } from './auth/types';
import { SearchHeaderReducerType } from './searchHeader/types';
import { TegsReducerTypeStore } from './tegs/types';

export type RootReducerType = {
  auth: UserInfoReducerType;
  tegs: TegsReducerTypeStore;
  searchHeader: SearchHeaderReducerType;
};
