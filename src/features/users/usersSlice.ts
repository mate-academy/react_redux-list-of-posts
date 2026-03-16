/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  error: string;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  error: '',
  loading: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
