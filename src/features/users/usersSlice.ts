/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong...';
    });
  },
});

export default usersSlice.reducer;
