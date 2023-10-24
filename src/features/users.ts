/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type UsersType = {
  users: User[],
  loading: boolean,
  error: boolean,
};

const initialState: UsersType = {
  users: [],
  loading: false,
  error: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
