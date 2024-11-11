/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UserState {
  users: User[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};

export const initUsers = createAsyncThunk('users/fetchUsers', () => getUsers());

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(initUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
