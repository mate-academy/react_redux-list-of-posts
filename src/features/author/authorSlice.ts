/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author;

export default authorSlice.reducer;
