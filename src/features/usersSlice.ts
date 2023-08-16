/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loaded = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loaded = false;
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
