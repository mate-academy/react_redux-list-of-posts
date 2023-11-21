/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type InitialState = {
  users: User[]
};

const initialState:InitialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
