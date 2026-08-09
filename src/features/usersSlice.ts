/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  loaded: boolean;
  loading: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  loading: false,
  hasError: false,
  items: [],
};

export const loadUsers = createAsyncThunk(
  'users/load',
  async () => {
    return getUsers();
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        users: UsersState;
      };

      return !state.users.loading && !state.users.loaded;
    },
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.loading = false;
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
