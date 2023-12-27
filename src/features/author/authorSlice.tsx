/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null,
}

export const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, { payload }) {
      state.author = payload;
    },
  },
});

export default authorSlice.reducer;

export const { setAuthor } = authorSlice.actions;
