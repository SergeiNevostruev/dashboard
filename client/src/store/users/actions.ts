import makeRequest from '../../network';
import { UsersActionsTypeType } from './types';

export const UsersActionsType: UsersActionsTypeType = {
  getUsers: 'GET_USERS',
};

export const GetUsersAction = () => async (dispatch: any) => {
  const data = await makeRequest({ url: '/character' });
  dispatch({
    type: UsersActionsType.getUsers,
    payload: data.results,
  });
};
