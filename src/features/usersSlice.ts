/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder, createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
  users: User[],
  loaded: boolean,
  hasErrors: boolean,
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasErrors: false,
};

export const init = createAsyncThunk(
  'users/init',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UsersState>) => {
    builder
      .addCase(init.pending, (state) => {
        state.loaded = false;
        state.hasErrors = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loaded = true;
        state.users = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loaded = true;
        state.hasErrors = true;
      });
  },
});

export default usersSlice.reducer;
