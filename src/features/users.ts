/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[],
  loader: boolean,
  error: boolean,
};

const initialState: UsersState = {
  users: [],
  loader: false,
  error: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loader = true;
      state.error = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loader = false;
      state.error = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loader = false;
      state.users = action.payload;
      state.error = false;
    });
  },
});

export default usersSlice.reducer;
