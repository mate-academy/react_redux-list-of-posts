/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import type { User } from '../types/User';

type UsersState = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
