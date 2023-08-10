/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder, createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
  users: User[],
  status: 'idle' | 'loading' | 'failed',
};

const initialState: UsersState = {
  users: [],
  status: 'loading',
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
        state.status = 'loading';
      })
      .addCase(init.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
