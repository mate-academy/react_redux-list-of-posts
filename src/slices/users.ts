/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[],
};

const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }),
});

export default usersSlice.reducer;
