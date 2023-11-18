import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const initialState: User[] = [];

export const setUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUsers.fulfilled, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
