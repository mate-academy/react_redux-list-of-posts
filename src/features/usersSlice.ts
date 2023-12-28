/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[],
  loading: boolean,
  error: boolean,
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const initUsers = createAsyncThunk(
  'users/fetch',
  () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(initUsers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
