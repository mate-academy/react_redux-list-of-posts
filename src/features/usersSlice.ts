/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [] as User[],
  status: 'idle',
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const actions = usersSlice.actions;
export default usersSlice.reducer;
