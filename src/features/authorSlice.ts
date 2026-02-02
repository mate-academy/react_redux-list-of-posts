/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorsSlice = createSlice<AuthorState>({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<AuthorState>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorsSlice.actions;
export const selectAuthor = (state: RootState) => state.author;

export default authorsSlice.reducer;
