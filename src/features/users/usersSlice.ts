import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { getUsers } from '../../api/users';

export type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const initUsers = createAsyncThunk('users/fetch', getUsers);

/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
