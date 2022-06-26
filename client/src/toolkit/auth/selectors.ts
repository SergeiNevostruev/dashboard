import { RootReducerType } from '../rootType';

const GetUserName = (state: RootReducerType) => state.auth.name;
export const GetUserDataInfo = (state: RootReducerType) => state.auth;
export const GetUserToken = (state: RootReducerType) => state.auth.token;


export default GetUserName;
