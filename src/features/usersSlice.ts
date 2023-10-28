/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk(
  'users/fetch', () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = 'Unable to load data from server';
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
