/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

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
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const authorState = (state: RootState) => state.author;
export const authorReducer = authorSlice.reducer;
