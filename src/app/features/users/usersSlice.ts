/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

type UserState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const featchUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(featchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(featchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(featchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
