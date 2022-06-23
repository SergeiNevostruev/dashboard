import { RootReducerType } from '../rootType';

const GetSearchHeaderData = (state: RootReducerType) => state.searchHeader.data;
const GetSearchHeaderLoadind = (state: RootReducerType) => state.searchHeader.loading;


export {GetSearchHeaderData, GetSearchHeaderLoadind};
