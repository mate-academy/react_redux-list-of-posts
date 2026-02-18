/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UserState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

export const initialState: UserState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/load', async () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = true;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default userSlice.reducer;
