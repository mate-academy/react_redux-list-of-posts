import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startLoadingComments: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),

    setComments: (_state, action: PayloadAction<Comment[]>) => ({
      loaded: true,
      hasError: false,
      items: action.payload,
    }),

    setCommentsError: state => ({
      ...state,
      loaded: true,
      hasError: true,
    }),

    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),

    removeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),

    clearComments: () => initialState,
  },
});

export const {
  startLoadingComments,
  setComments,
  setCommentsError,
  addComment,
  removeComment,
  clearComments,
} = commentsSlice.actions;
