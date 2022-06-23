import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "joi";
import PostRequest from "../../network";
import { RootReducerType } from "../rootType";
import { TegsReducerType } from "./types";

export const getTegsData = createAsyncThunk('tegs/getTegsData', async (params, thunkAPI) => {
    const tegsDB: TegsReducerType = await PostRequest({ url: '/api/tegs', method: 'GET' });
    thunkAPI.dispatch(SetTegsAction({tegs: tegsDB}))
    return tegsDB;
})

export const getProductData = createAsyncThunk(
  'tegs/getProductData', 
  async (params, thunkAPI) => {
    const store = thunkAPI.getState() as RootReducerType;
    if (!store.tegs.tegs) {
      const tegsDB: TegsReducerType = await PostRequest({ url: '/api/tegs', method: 'GET' });
      thunkAPI.dispatch(SetTegsAction({tegs: tegsDB}))
    }

    const tegs = 
    store.tegs.tegs.filter((v) => v.change === true)
    .map((v) => v.id)
    .join(',') 
    || store.tegs.tegs
    .map((v) => v.id)
    .join(',');  
    console.log('теги',tegs);
    if (!tegs) {
      const productsDB: TegsReducerType = await PostRequest({ 
        url: 'api/products', 
        method: 'GET', 
        data: {}, 
        params: {
          page: 1,
          count: store.tegs.count
        }  });
      thunkAPI.dispatch(SetDataProductAction({data: productsDB}))
      return productsDB;
    } else {
      const productsDB: TegsReducerType = await PostRequest({ 
        url: 'api/products', 
        method: 'GET', 
        data: {}, 
        params: {
          page: 1,
          tegs,
          count: store.tegs.count
        }  });
      thunkAPI.dispatch(SetDataProductAction({data: productsDB}))
      return productsDB;
    }


})

export const tegsSlice = createSlice({
    name: 'tegs',
    initialState: {
        loading: false,
        error: false,
        tegs: [] as TegsReducerType,
        data: [] as any,
        count: 12,
        searchPage: {1: '', 2: ''}
    },
    reducers: {
       SetTegsAction: (state, action) => {
        state.tegs = action.payload.tegs;
      },
      SetDataProductAction: (state, action) => {
        state.data = action.payload.data;
      },
      SetPageCountAction: (state, action) => {
        state.count = action.payload.count;
      },
      SetSearchPage: (state, action) => {
        state.searchPage = action.payload.searchPage ;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getTegsData.pending, (state)=>{
            state.loading = true;
      })
      .addCase(getTegsData.rejected, (state) => {
            state.loading = false;
            state.error = true;
      })
      .addCase(getTegsData.fulfilled, (state, action) => {
            state.loading = false;
            state.tegs = action.payload;
      })
      .addCase(getProductData.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getProductData.rejected, (state) => {
            state.loading = false;
            state.error = true;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
      })
    }
});

// export default tegsSlice;

const {SetTegsAction, SetDataProductAction, SetPageCountAction, SetSearchPage } = tegsSlice.actions;

export {SetTegsAction, SetDataProductAction, SetPageCountAction, SetSearchPage};
export default tegsSlice.reducer;
