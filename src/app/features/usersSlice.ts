/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  users: [] as User[],
  isLoading: false,
  isError: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.isError = '';
      state.isLoading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.isError = action.error.message || '';
      state.isLoading = false;
    });
  },
});
