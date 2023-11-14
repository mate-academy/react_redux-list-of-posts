/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // other actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });

    builder
      .addCase(init.rejected, (state) => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
