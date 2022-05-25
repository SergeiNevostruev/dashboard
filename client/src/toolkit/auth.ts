import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
      name: '',
    },
    reducers: {
        SetUserNameAction: (state, action) => {
        state.name = action.payload;
      },
        ClearUserNameAction: (state) => {
        state.name = '';
      },
    },
  })

  export default authSlice;

const { actions } = authSlice;

export const {SetUserNameAction, ClearUserNameAction} = actions;


