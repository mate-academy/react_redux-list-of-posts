/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;

export const init = createAsyncThunk('users/fetch', () => getUsers());
