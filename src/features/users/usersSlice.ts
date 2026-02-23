/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { getUsers } from '../../api/users';

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

export const loadUsers = createAsyncThunk<User[]>('users/fetch', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something went wrong';
      state.loading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = { ...usersSlice.actions, loadUsers };
