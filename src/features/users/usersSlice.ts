/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as usersApi from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
};

export const loadUsers = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const value = await usersApi.getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = [...state.value, ...action.payload];
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
