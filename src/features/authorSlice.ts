/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

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
    setAuthor: (state, action) => {
      state.author = action.payload;
    },

    resetAuthor: (state) => {
      state.author = null;
    },
  },
});

export const { setAuthor, resetAuthor } = authorSlice.actions;
export default authorSlice.reducer;
