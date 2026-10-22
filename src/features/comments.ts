import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: () => initialState,
    received: (_state, action: PayloadAction<Comment[]>) => ({
      items: action.payload,
      loaded: true,
      hasError: false,
    }),
    failed: state => ({ ...state, loaded: true, hasError: true }),
    added: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
    removed: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(item => item.id !== action.payload),
    }),
  },
});

export const { reset, received, failed, added, removed } = slice.actions;
export default slice.reducer;
