import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

/* eslint-disable no-param-reassign */

export type InitialStateType = User[];

const initialState: InitialStateType = [];

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
