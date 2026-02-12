import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const loadUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.fulfilled, (state, action) => action.payload);
  },
});

export default usersSlice.reducer;
