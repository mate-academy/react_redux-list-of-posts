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

export const loadUsersAsync = createAsyncThunk('users/loadUsers', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsersAsync.pending, state => {
        state.loading = true;
      })
      .addCase(loadUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload.slice(0, 10);
        state.loading = false;
      })
      .addCase(loadUsersAsync.rejected, state => {
        state.loading = false;
        state.error = 'Cannot load users';
      });
  },
});

export default usersSlice.reducer;
