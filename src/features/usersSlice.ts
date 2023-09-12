/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { Status } from '../types/Status';

export type UsersState = {
  users: User[];
  status: Status;
};

const initialState: UsersState = {
  users: [],
  status: Status.IDLE,
};

export const usersFetch = createAsyncThunk(
  'users/fetch',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersFetch.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(usersFetch.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.users = action.payload;
      })
      .addCase(usersFetch.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
