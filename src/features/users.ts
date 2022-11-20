/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: 'succeeded' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'succeeded',
};

export const getUsersFromServer = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersFromServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersFromServer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUsersFromServer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
