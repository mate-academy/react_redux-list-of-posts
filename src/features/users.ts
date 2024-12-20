/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const init = createAsyncThunk('users/fetch', () => getUsers());

type Users = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: Users = {
  users: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
