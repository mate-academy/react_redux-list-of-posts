/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
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
