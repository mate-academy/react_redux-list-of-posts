/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default usersSlice.reducer;
