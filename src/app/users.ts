/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersType = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersType = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/init', () => {
  return getUsers();
});

export const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Users havent been loaded!';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.error = '';
      state.loading = false;
      state.users = action.payload;
    });
  },
});
