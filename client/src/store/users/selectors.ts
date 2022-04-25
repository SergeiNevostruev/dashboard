import { RootReducerType } from '../rootType';

const getUsers = (state: RootReducerType) => state.users.data;
export default getUsers;
