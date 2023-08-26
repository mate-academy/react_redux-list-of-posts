/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = 'idle';
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default usersSlice.reducer;
