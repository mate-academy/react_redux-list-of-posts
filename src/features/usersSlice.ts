import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const initialState: User[] = [];

export const fetchUsersAsync = createAsyncThunk('users/getUsers', async () => {
  const arr = await getUsers();

  return arr;
});

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default UsersSlice.reducer;
