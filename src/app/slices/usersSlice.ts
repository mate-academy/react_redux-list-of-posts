/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { usersThunk } from '../thunks/usersThunk';

const initialState: UsersState = {
  users: [],
  author: null,
};

const usersSlice = createSlice({
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

export const { setAuthor } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export interface UsersState {
  users: User[],
  author: User | null,
}
