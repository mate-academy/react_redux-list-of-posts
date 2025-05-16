/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unexpected error occured';
    });
  },
});

export const usersReducer = usersSlice.reducer;
