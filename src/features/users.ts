/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const getUsersAsync = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
