/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
};

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initUsers.pending, state => {
        state.loading = false;
        state.error = '';
        state.users = [];
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.loading = true;
        state.users = action.payload;
        state.error = '';
      })

      .addCase(initUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = [];
      });
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
