/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialAuthor: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor as AuthorState,
  reducers: {
    setAuthor: (author, action: PayloadAction<User>) => {
      author = action.payload;

      return author;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
