import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers } from '../../api/users';
import { User } from '../../types/User';

const initialState: User[] = [];

export const loadUsers = createAsyncThunk('users/loadUsers', async () =>
  getUsers(),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
