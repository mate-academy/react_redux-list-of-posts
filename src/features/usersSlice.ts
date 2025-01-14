/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersTypeSlice = {
  users: User[];
  loading: boolean;
  error: string;
};

export const initialState: UsersTypeSlice = {
  users: [],
  loading: false,
  error: '',
};

export const initPeople = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initPeople.pending, state => {
        state.loading = true;
      })
      .addCase(initPeople.rejected, state => {
        state.error = 'something went wrong';
        state.loading = false;
      })
      .addCase(initPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});
export default usersSlice.reducer;
