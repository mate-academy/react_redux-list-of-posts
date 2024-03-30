/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};

export const initUsers = createAsyncThunk('users/fetch', getUsers);

const initialUsersState: InitialState = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(initUsers.rejected, state => {
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
