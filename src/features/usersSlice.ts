import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});
