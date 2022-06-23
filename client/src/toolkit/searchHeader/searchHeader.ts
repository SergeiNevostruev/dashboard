import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "joi";
import PostRequest from "../../network";
import { RootReducerType } from "../rootType";

export const getDataSearchProductHeader = createAsyncThunk(
  'searchHeader/getDataSearchProductHeader', 
  async (params: {search: string, page: number, count: number}, thunkAPI) => {
    const store = thunkAPI.getState() as RootReducerType;
      const productsDB = await PostRequest({ 
        url: 'api/products', 
        method: 'GET', 
        data: {}, 
        params: {
          page: params.page,
          search: params.search,
          count: params.count
        }  });
      thunkAPI.dispatch(SetSearchProductHeaderAction({data: productsDB}))
      return productsDB;
})

export const searchHeaderSlice = createSlice({
    name: 'searchHeader',
    initialState: {
        loading: false,
        error: false,
        data: {
          countProductReq: 0,
          countProduct: 0,
          countPage: 0,
          countProductOnPage: 0,
          pageNumber: 0,
          data: [] as any 
        },
    },
    reducers: {
      SetSearchProductHeaderAction: (state, action) => {
        state.data = action.payload.data;
      },
      ClearSearchProductHeaderAction: (state) => {
        state.data = {
          countProductReq: 0,
          countProduct: 0,
          countPage: 0,
          countProductOnPage: 0,
          pageNumber: 0,
          data: [] as any 
        };
      },
    },
    extraReducers: (builder) => {
      builder

      .addCase(getDataSearchProductHeader.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getDataSearchProductHeader.rejected, (state) => {
            state.loading = false;
            state.error = true;
      })
      .addCase(getDataSearchProductHeader.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
      })
    }
});



const {SetSearchProductHeaderAction, ClearSearchProductHeaderAction} = searchHeaderSlice.actions;

export {SetSearchProductHeaderAction, ClearSearchProductHeaderAction};
export default searchHeaderSlice.reducer;
