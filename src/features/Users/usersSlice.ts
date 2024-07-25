/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [] as User[],
  status: 'idle',
};

export const asyncGetUsers = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(asyncGetUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(asyncGetUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
