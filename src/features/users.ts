import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { SliceType } from '../types/SliceType';

const initialState: User[] = [];

export const setUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: SliceType.Users,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setUsers.fulfilled, (users, action) => {
      users.push(...action.payload);
    });
  },
});

export default usersSlice.reducer;
