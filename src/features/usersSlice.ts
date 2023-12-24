/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const initUsers = createAsyncThunk('users/fetchUsers', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(initUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })

      .addCase(initUsers.rejected, (state) => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export const { removeUsers } = usersSlice.actions;

export default usersSlice.reducer;
