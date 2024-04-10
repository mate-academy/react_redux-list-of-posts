/* eslint-disable no-param-reassign */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
  author: User | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
  author: null,
};

export const init = createAsyncThunk('users/fetch', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
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
        state.loading = false;
        state.error = 'Thomething went wrong';
      });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
