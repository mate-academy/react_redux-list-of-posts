import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const loadUsers = createAsyncThunk('users/load', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_state, action) => action.payload);
  },
});

export default usersSlice.reducer;
