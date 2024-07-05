/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorType = User | null;

const selectedPostSlice = createSlice({
  name: 'author',
  initialState: null as AuthorType,
  reducers: {
    setAuthor: (_, { payload }: PayloadAction<AuthorType>) => payload,
  },
});

export default selectedPostSlice.reducer;
export const { setAuthor } = selectedPostSlice.actions;
