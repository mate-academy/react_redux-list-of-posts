import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
/* eslint-enable no-param-reassign */

export default usersSlice.reducer;
