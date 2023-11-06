import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

/* eslint-disable no-param-reassign */
export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.author;

export default authorSlice.reducer;
