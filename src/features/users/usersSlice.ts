/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { usersThunk } from './usersThunk';

interface Users {
  users: User[],
  author: User | null,
}

const initialState: Users = {
  users: [],
  author: null,
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
    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setAuthor } = users.actions;
export const usersReducer = users.reducer;
