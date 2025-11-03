import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

/* eslint-disable no-param-reassign */

export const loadUsers = createAsyncThunk<User[]>(
  'users/loadUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});
