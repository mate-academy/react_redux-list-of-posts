/* eslint-disable no-param-reassign */
import { User } from '../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default usersSlice.reducer;
