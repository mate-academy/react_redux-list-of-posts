/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const loadUsers = createAsyncThunk('users/load', async () => {
  return getUsers();
});

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
