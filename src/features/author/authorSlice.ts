/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = {
  author: User | null;
};

const initialState: Author = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
