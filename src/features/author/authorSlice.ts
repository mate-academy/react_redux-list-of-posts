/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

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
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;
export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
