/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  loading: boolean;
  data: User[];
  error: string;
}
const initialState: UsersState = {
  loading: false,
  data: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.loading = false;
        state.error = 'failed';
      });
  },
});

export default usersSlice.reducer;
