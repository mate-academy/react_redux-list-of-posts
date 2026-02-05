/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = { author: User | null };

export const authorSlice = createSlice({
  name: 'author',
  initialState: { author: null } as AuthorState,
  reducers: {
    setAuthor(state, action) {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
