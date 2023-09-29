/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

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
    set: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
