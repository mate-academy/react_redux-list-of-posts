/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersSliceState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersSliceState = {
  users: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
