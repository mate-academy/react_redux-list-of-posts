/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
type UsersState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
