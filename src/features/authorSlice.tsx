/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = { author: null };

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { getAuthor } = authorSlice.actions;
