/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as users from '../api/users';
import { User } from '../types/User';

type UsersState = {
  users: User[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const getUsers = createAsyncThunk('users/get', () => {
  return users.getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: true,
        users: action.payload,
        hasError: false,
      };
    });
    builder.addCase(getUsers.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export default usersSlice.reducer;
export const { clearUsers } = usersSlice.actions;
