/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const getUsersAsync = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export interface UserState {
  users: User[],
  loaded: boolean,
  error: boolean,
}

const initialState: UserState = {
  users: [],
  loaded: false,
  error: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.pending, (state) => {
      state.loaded = true;
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.loaded = false;
      state.users = action.payload;
    });
    builder.addCase(getUsersAsync.rejected, (state) => {
      state.loaded = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
