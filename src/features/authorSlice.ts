/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;
export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
