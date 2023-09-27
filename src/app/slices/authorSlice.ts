/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

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
    selectAuthor: (state, action) => {
      state.author = action.payload;
    },

    clear: (state) => {
      state.author = null;
    },
  },
});

export default authorSlice.reducer;
export const { selectAuthor, clear } = authorSlice.actions;
