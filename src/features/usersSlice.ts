/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  users: [] as User[],
  error: false,
  loaded: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = false;
      state.error = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.error = true;
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });
  },
});

export default usersSlice.reducer;
