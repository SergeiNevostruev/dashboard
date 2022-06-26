import { RootReducerType } from '../rootType';

const GetTegsArray = (state: RootReducerType) => state.tegs.tegs;
const GetUserTegsArray = (state: RootReducerType) => state.tegs.usertegs;
const GetMainProductArray = (state: RootReducerType) => state.tegs.data;
const GetMainUserProductArray = (state: RootReducerType) => state.tegs.userdata;
const GetProductCountOnMaimPage = (state: RootReducerType) => state.tegs.count;
const GetSearchProduct = (state: RootReducerType) => state.tegs.searchPage;
const GetSearchUserProduct = (state: RootReducerType) => state.tegs.searchProduct;

export default {GetTegsArray, GetMainProductArray, GetProductCountOnMaimPage, GetSearchProduct, GetMainUserProductArray, GetUserTegsArray, GetSearchUserProduct};
