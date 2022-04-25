import { RootReducerType } from '../rootType';

const GetUserName = (state: RootReducerType) => state.auth.name;

export default GetUserName;
