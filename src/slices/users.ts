/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  items: User[];
  loaded: boolean;
  error: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  error: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loaded = true;
      })

      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.error = true;
      }),
});

export default usersSlice.reducer;
