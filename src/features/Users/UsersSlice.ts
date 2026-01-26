/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UserState = {
  items: User[];
  selectedUser: User | null;

  loaded: boolean;
  hasError: string;
};

const initialState: UserState = {
  items: [],
  selectedUser: null,
  loaded: false,
  hasError: '',
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
      state.hasError = '';
      state.loaded = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.hasError = action.error.message || '';
      state.loaded = false;
    });
  },
});
