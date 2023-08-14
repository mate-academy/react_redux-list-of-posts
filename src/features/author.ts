/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  user: User | null;
};

const initialAuthor: AuthorState = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor,
  reducers: {
    setAuthor: (author, action: PayloadAction<User>) => {
      author.user = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
