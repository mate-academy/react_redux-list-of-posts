/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const loadUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadUsers.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => {
        state.users = payload;
      },
    );
  },
});

export default usersSlice.reducer;
