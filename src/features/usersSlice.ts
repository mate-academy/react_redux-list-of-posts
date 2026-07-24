/* eslint-disable no-param-reassign */
import { User } from '../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';

type UsersState = {
  loading: boolean;
  users: User[];
  error: string;
};

const initialState: UsersState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk<User[]>('users/fetch', async () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default usersSlice.reducer;
