export type UsersActionsTypeType = {
  getUsers: 'GET_USERS';
};

export type UserReducerType = {
  data: any[];
};

export type GetUsersActionType = {
  type: UsersActionsTypeType['getUsers'];
  payload: any[];
};

export type ActionType = GetUsersActionType;
