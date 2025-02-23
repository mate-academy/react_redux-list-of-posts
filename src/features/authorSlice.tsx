/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = { author: null };

const authorSlcie = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload as User;
    },
  },
});

export default authorSlcie.reducer;
