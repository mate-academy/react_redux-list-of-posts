import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
