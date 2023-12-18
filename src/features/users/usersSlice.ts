/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUsers } from '../../api/users';

import { User } from '../../types';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
