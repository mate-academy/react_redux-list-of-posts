/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UserState = {
  users: User[];
  selectedUser: User | null;

  loading: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});
