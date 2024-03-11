/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import type { RootState } from '../../app/store';

type State = {
  author: User | null;
};

const initialState: State = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;
export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
