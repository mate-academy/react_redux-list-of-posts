/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorType = null | User;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorType,
  reducers: {
    changeAuthor: (currentAuthor, action: PayloadAction<User>) =>
      (currentAuthor = action.payload),
  },
});

export default authorSlice.reducer;
export const { changeAuthor } = authorSlice.actions;
