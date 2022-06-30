import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "joi";
import PostRequest from "../../network";
import { RootReducerType } from "../rootType";
import { TegsReducerType } from "./types";

export const getTegsData = createAsyncThunk('tegs/getTegsData', async (params, thunkAPI) => {
    const tegsDB: TegsReducerType = await PostRequest({ url: '/api/tegs', method: 'GET' }).catch(() => console.log('ошибка сервера'));
    thunkAPI.dispatch(SetTegsAction({tegs: tegsDB || [{id: 1, teg: 'Все товары' }]}))
    return tegsDB || [{id: 1, teg: 'Все товары' }];
})

export const getProductData = createAsyncThunk(
  'tegs/getProductData', 
  async (params, thunkAPI) => {
    const store = thunkAPI.getState() as RootReducerType;
    if (!store.tegs.tegs) {
      const tegsDB: TegsReducerType = await PostRequest({ url: '/api/tegs', method: 'GET' }).catch(() => console.log('ошибка сервера'));
      thunkAPI.dispatch(SetTegsAction({tegs: tegsDB || [{id: 1, teg: 'Все товары' }]}))
    }

    const tegs = 
    store.tegs.tegs.filter((v) => v.change === true)
    .map((v) => v.id)
    .join(',') 
    || store.tegs.tegs
    .map((v) => v.id)
    .join(',');  
    // console.log('теги',tegs);
    if (!tegs) {
      const productsDB: TegsReducerType = await PostRequest({ 
        url: 'api/products', 
        method: 'GET', 
        data: {}, 
        params: {
          page: 1,
          count: store.tegs.count
        }  }).catch(() => console.log('ошибка сервера'));
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
        }  }).catch(() => console.log('ошибка сервера'));
      thunkAPI.dispatch(SetDataProductAction({data: productsDB}))
      return productsDB;
    }
})

export const getUserProductData = createAsyncThunk(
  'tegs/getUserProductData', 
  async (params: {token: string, tegs: string}, thunkAPI) => {
    if (!params.token) return;
    const store = thunkAPI.getState() as RootReducerType;
    const url = store.auth.scope !== 'admin'? '/api/user-products':'api/products';
    const search = store.tegs.searchProduct || '';
    const pageNumber = store.tegs.userdatapage || 1;
    if (!params.tegs) {
      const productsDB: TegsReducerType = await PostRequest({ 
        url, 
        method: 'GET', 
        data: {}, 
        params: {
          page: pageNumber,
          count: store.tegs.count,
          search
        }, headers: { Authorization: `Bearer ${params.token}` }  }).catch(() => console.log('ошибка сервера'));;
      thunkAPI.dispatch(SetDataUserProductAction({userdata: productsDB}))
      return productsDB;
    } else {
      const productsDB: TegsReducerType = await PostRequest({ 
        url, 
        method: 'GET', 
        data: {}, 
        params: {
          page: pageNumber,
          tegs: params.tegs,
          count: store.tegs.count,
          search
        }, headers: { Authorization: `Bearer ${params.token}` }}).catch(() => console.log('ошибка сервера'));
        
      thunkAPI.dispatch(SetDataUserProductAction({userdata: productsDB}))
      return productsDB;
    }
})

export const tegsSlice = createSlice({
    name: 'tegs',
    initialState: {
        loading: false,
        error: false,
        tegs: [{id: 1, teg: 'Все товары' }] as TegsReducerType,
        usertegs: '' as string,
        data: [] as any,
        userdata: [] as any,
        userdatapage: 1,
        count: 12,
        searchPage: {1: '', 2: ''},
        searchProduct: ''
    },
    reducers: {
       SetTegsAction: (state, action) => {
        state.tegs = action.payload.tegs;
      },
      SetTegsUserAction: (state, action) => {
        state.usertegs = action.payload.usertegs;
      },
      SetDataProductAction: (state, action) => {
        state.data = action.payload.data;
      },
      SetDataUserProductAction: (state, action) => {
        state.userdata = action.payload.userdata;
      },
      SetDataUserProductPageAction: (state, action) => {
        state.userdatapage = action.payload.userdatapage;
      },
      SetPageCountAction: (state, action) => {
        state.count = action.payload.count;
      },
      SetSearchPage: (state, action) => {
        state.searchPage = action.payload.searchPage ;
      },
      SetSearchUserProduct: (state, action) => {
        state.searchProduct = action.payload.searchProduct ;
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
      .addCase(getUserProductData.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getUserProductData.rejected, (state) => {
            state.loading = false;
            state.error = true;
      })
      .addCase(getUserProductData.fulfilled, (state, action) => {
            state.loading = false;
            state.userdata = action.payload;
      })
    }
});

// export default tegsSlice;

const {SetTegsAction, SetDataProductAction, SetPageCountAction, SetSearchPage, SetDataUserProductAction, SetTegsUserAction, SetSearchUserProduct, SetDataUserProductPageAction } = tegsSlice.actions;

export {SetTegsAction, SetDataProductAction, SetPageCountAction, SetSearchPage, SetDataUserProductAction, SetTegsUserAction, SetSearchUserProduct, SetDataUserProductPageAction };
export default tegsSlice.reducer;
