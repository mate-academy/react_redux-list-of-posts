/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  data: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  data: [],
  status: 'idle',
};

export const addUsersAsync = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(addUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(addUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addUsersAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
