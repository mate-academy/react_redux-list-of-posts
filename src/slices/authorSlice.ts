// src/slices/authorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state, action: PayloadAction<User | null>) {
      return {
        ...initialState,
        author: action.payload,
      } as AuthorState;
    },
    clearAuthor() {
      return { ...initialState };
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;
