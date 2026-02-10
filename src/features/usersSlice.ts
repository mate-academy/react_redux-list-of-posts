/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  status: 'idle';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const usersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
