/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UserState {
  users: User[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const initUsers = createAsyncThunk('users/initUsers', async () => {
  const value = await getUsers();

  // The value we return becomes the `fulfilled` action payload
  return value;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(initUsers.rejected, state => {
      state.error = 'Something went wrong';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
