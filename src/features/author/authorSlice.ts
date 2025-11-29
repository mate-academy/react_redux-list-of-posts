/* eslint-disable no-param-reassign */
// features/author/authorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  current: User | null;
};

const initialState: AuthorState = {
  current: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
    clearAuthor: state => {
      state.current = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;
