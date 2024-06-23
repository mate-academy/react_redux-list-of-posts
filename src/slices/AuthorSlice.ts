/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    initAuthor: (state, actions) => {
      state.author = actions.payload;
    },
  },
});

export const { initAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author;

export default authorSlice.reducer;
