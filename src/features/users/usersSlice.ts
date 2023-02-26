/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  items: User[],
  hasError: boolean,
};

const initialState: UsersState = {
  items: [],
  hasError: false,
};

export const loadUsers = createAsyncThunk(
  'users/load',
  async () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
