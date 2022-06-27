import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authSlice from './auth/auth'; 
import searchHeaderSlice from './searchHeader/searchHeader';
import tegs from './tegs/tegs';

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    tegs: tegs,
    searchHeader: searchHeaderSlice,
  });



const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export default store;