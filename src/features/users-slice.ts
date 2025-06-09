/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UserState = {
  users: User[];
  status: 'resolved' | 'rejected' | 'idle' | 'pending';
};

const initialPosition: UserState = {
  users: [],
  status: 'idle',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialPosition,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = 'resolved';
    });
    builder.addCase(init.rejected, state => {
      state.status = 'rejected';
    });
  },
});

export default userSlice.reducer;
