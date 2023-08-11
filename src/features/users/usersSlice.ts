/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { usersThunk } from './usersThunk';

interface Users {
  users: User[],
  author: User | null,
  hasUsersError: boolean,
  hasUsersLoaded: boolean,
}

const initialState: Users = {
  users: [],
  author: null,
  hasUsersError: false,
  hasUsersLoaded: false,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersThunk.rejected, (state) => {
      state.hasUsersError = true;
      state.hasUsersLoaded = true;
    });

    builder.addCase(usersThunk.pending, (state) => {
      state.hasUsersLoaded = false;
    });

    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
      state.hasUsersError = false;
      state.hasUsersLoaded = true;
    });
  },
});

export const { setAuthor } = users.actions;
export const usersReducer = users.reducer;
