/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { getUsers } from "../api/users";

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
