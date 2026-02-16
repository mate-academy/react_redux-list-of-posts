/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { select } = usersSlice.actions;
export default usersSlice.reducer;
