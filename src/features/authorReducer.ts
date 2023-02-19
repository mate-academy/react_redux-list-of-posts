/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    addAuthor: (_, action: PayloadAction<User>) => action.payload,
    deleteAuthor: () => null,
  },
});

export default authorSlice.reducer;
export const { addAuthor, deleteAuthor } = authorSlice.actions;
