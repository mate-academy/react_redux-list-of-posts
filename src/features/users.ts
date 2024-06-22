/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  items: User[];
  isLoading: boolean;
  error: string;
};

const initialState: UsersState = {
  items: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Cannot load users';
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
