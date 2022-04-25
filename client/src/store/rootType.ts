import { UserInfoReducerType } from './auth/types';
import { UserReducerType } from './users/types';

export type RootReducerType = {
  auth: UserInfoReducerType;
  users: UserReducerType;
};
