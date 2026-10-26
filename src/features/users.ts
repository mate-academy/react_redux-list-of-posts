import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const initUsers = createAsyncThunk('users/init', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
