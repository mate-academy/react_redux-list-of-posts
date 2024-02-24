/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  users: User[],
  error: string,
};

const initialState: State = {
  users: [],
  error: '',
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.rejected, (state) => {
      state.error = 'Can`t downloading users from server';
    });
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
