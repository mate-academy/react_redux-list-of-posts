import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersInit = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersInit.fulfilled, (users, action) => {
      users.push(...action.payload);
    });
  },
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
