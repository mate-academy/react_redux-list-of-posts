/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const usersAsync = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(usersAsync.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(usersAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
