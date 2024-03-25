import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import * as users from '../api/users';
/* eslint-disable no-param-reassign */

type UsersState = {
  users: User[];
  loading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
};

export const getUsersFromServer = createAsyncThunk('users/get', () => {
  return users.getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: state => {
      state.users = [];
      state.loading = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersFromServer.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getUsersFromServer.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        hasError: false,
        loading: false,
      };
    });
    builder.addCase(getUsersFromServer.rejected, state => {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    });
  },
});

export default usersSlice.reducer;
export const { clearUsers } = usersSlice.actions;
