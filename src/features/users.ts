import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import type { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>
  getUsers(),
);

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
