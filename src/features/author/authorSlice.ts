import { createSlice } from '@reduxjs/toolkit';
import { Author } from '../../types/Author';

interface AuthorState {
  author: Author | null;
}

interface ActionAuthorReducer {
  payload: AuthorState;
}

export const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: null,
  },
  reducers: {
    setAuthor(state: AuthorState, action: ActionAuthorReducer) {
      state.author = action.payload.author;
    },
  },
});

export const authorReducer = authorSlice.reducer;

export const { setAuthor } = authorSlice.actions;
