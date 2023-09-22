/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import type { RootState } from '../../app/store';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
};

export const loadUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const value = await getUsers();

    // The value we return becomes the `fulfilled` action payload
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
        state.value = action.payload;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
