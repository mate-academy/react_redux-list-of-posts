/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[] | [];
};

const initialState: UserState = {
  users: [],
};

export const setUsers = createAsyncThunk('state/users', async () => {
  const result = await getUsers();

  return result;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
