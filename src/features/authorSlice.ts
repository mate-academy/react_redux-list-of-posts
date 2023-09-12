/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    authorSet: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    authorSetEmpty: (state) => {
      state.author = null;
    },
  },
});

export const { authorSet, authorSetEmpty } = authorSlice.actions;
export default authorSlice.reducer;
