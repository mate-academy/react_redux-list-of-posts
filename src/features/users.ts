/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';
import { getUsers } from '../api/users';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as User[],
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
  },
});

export const getUsersFromStore = (store: RootState) => store.users.items;
