/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const authorState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState: authorState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    removeAuthor: state => {
      state.author = null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
