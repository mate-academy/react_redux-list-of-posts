/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  items: User[];
  author: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  author: null,
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export const { setAuthor } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.items;

export const selectAuthor = (state: RootState) => state.users.author;

export const selectUsersLoaded = (state: RootState) => state.users.loaded;

export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
