/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk(
  'users/fetch',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.loaded = false;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = true;
      })
      .addCase(initUsers.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
