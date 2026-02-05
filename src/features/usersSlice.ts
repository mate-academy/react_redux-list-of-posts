/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const usersInit = createAsyncThunk('users/init', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersInit.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(usersInit.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(usersInit.rejected, state => {
        state.loading = false;
        state.error = 'Error loading users';
      });
  },
});

export default usersSlice.reducer;

