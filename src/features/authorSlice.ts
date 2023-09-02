/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User>) => {
      state.author = action.payload;
    },

    removeAuthor: (state: AuthorState) => {
      state.author = null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;

export default authorSlice.reducer;
