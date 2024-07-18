/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
  users: User[];
};

// const initialState = [] as User[];

const initialState: UsersState = {
  users: [],
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice: Slice<UsersState> = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
