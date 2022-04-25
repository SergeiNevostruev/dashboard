import { UserInfoActionTypeType } from './types';

export const UserInfoActionType: UserInfoActionTypeType = {
  setUserName: 'SET_USER_NAME',
  clearUserName: 'CLEAR_USER_NAME',
};

export const SetUserNameAction = (name: string) => ({
  type: UserInfoActionType.setUserName,
  payload: name,
});

export const ClearUserNameAction = () => ({
  type: UserInfoActionType.clearUserName,
});
