import { RootReducerType } from '../rootType';

const GetTegsArray = (state: RootReducerType) => state.tegs.tegs;
const GetMainProductArray = (state: RootReducerType) => state.tegs.data;
const GetProductCountOnMaimPage = (state: RootReducerType) => state.tegs.count;
const GetSearchProduct = (state: RootReducerType) => state.tegs.searchPage;

export default {GetTegsArray, GetMainProductArray, GetProductCountOnMaimPage, GetSearchProduct};
