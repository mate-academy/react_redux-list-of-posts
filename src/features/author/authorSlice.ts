import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../../types/Author';

interface AuthorState {
  author: Author | null;
}

export const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: null,
  },
  reducers: {
    setAuthor(
      state: AuthorState,
      action: PayloadAction<{ author: Author | null }>,
    ) {
      state.author = action.payload.author;
    },
  },
});

export const authorReducer = authorSlice.reducer;

export const { setAuthor } = authorSlice.actions;
