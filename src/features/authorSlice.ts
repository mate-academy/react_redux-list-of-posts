/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
