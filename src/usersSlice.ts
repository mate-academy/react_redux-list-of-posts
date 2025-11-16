/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/return-await */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from './api/users';
import { User } from './types/User';

export const loadUsers = createAsyncThunk('users/load', async () => {
  return await getUsers();
});

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
