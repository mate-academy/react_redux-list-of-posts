/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface AuthorState {
  author: User | null
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.author;

export default authorSlice.reducer;
