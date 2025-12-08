import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import type { RootState } from '../../app/store';

import { User } from '../../types/User';
/* eslint-disable no-param-reassign */

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data: User[] = await getUsers();

  return data;
});

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;

export const selectUsersItems = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;
export { fetchUsers };
