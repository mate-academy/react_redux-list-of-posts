/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  users: [] as User[],
  loading: false,
  hasError: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, users => {
      users.loading = true;
    });

    builder.addCase(init.fulfilled, (users, action) => {
      users.users = action.payload;
    });

    builder.addCase(init.rejected, users => {
      users.hasError = true;
      users.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
