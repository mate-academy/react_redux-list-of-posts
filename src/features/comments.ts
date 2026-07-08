import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<Comment[]>) => ({
      ...state,
      items: payload,
    }),
    setLoaded: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      loaded: payload,
    }),
    setError: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      hasError: payload,
    }),
    addComment: (state, { payload }: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, payload],
    }),
    deleteComment: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== payload),
    }),
  },
});
