/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { users } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const usersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const value = await users();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersAsync.pending, state => {
        // New request.
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(usersAsync.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      });
  },
});

export const usersList = (state: RootState) => state.users.items;
export const usersLoaded = (state: RootState) => state.users.loaded;
export const usersHasError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
