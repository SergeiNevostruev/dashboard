import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
      name: '',
      token: '',
      firstName: '',
      lastName: '',
      scope: ''
    },
    reducers: {
        SetUserNameAction: (state, action) => {
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.scope = action.payload.scope;
      },
        ClearUserNameAction: (state) => {
        state.name = '';
        state.token = '';
        state.firstName = '';
        state.lastName = '';
        state.scope = '';
      },
    },
  })

  export default authSlice;

const { actions } = authSlice;

export const {SetUserNameAction, ClearUserNameAction} = actions;


