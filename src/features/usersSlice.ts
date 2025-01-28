/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = User[];
const initialState: State = [];

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      loadUsers.fulfilled,
      (_state, action: PayloadAction<User[]>) => [...action.payload],
    );
  },
});

export default usersSlice.reducer;
