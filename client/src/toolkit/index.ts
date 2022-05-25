import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth'; 

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    // users: usersReducer,
  });



const store = configureStore({
  reducer: rootReducer,
});

export default store;