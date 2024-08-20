/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type State = {
  loading: boolean;
  error: string;
  users: User[];
};

const initialState: State = {
  loading: false,
  error: '',
  users: [],
};

export const { reducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something went wrong';
    });
  },
});
