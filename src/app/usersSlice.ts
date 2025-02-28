/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { LoadingStatus } from '../types';

export const getUsersThunk = createAsyncThunk('users/get', async () =>
  getUsers(),
);

type State = {
  users: User[];
  status: LoadingStatus;
};
const initialState: State = {
  users: [],
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersThunk.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUsersThunk.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.users = payload;
      })
      .addCase(getUsersThunk.rejected, state => {
        state.status = 'failed';
      });
  },
});
