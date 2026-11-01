/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const loadUsers = createAsyncThunk<User[], void>(
  'users/loadUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export interface UserState {
  loaded: boolean;
  items: User[];
  hasError: boolean;
}

const initialState: UserState = {
  loaded: false,
  items: [] as User[],
  hasError: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const selectUsers = (state: { users: UserState }) => state.users.items;
