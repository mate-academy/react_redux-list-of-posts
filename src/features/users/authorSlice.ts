/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface AuthorSlice {
  author: User | null,
}

const initialState: AuthorSlice = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
    },

  },
});

export const { setAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author;

export default authorSlice.reducer;
