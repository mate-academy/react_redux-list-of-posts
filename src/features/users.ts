/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'idle';
      })
      .addCase(initUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
