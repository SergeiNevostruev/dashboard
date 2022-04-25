export type UserInfoReducerType = {
  name: string;
};
export type UserInfoActionTypeType = {
  setUserName: 'SET_USER_NAME';
  clearUserName: 'CLEAR_USER_NAME';
};

export type SetUserNameActionType = {
  type: UserInfoActionTypeType['setUserName'];
  payload: string;
};

export type ClearUserNameActionType = {
  type: UserInfoActionTypeType['clearUserName'];
};

export type ActionType = SetUserNameActionType | ClearUserNameActionType;
