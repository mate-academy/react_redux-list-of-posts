import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    setCommentsLoading: () => ({
      loaded: false,
      hasError: false,
      items: [],
    }),

    setComments: (_state, action: PayloadAction<Comment[]>) => ({
      loaded: true,
      hasError: false,
      items: action.payload,
    }),

    setCommentsError: () => ({
      loaded: true,
      hasError: true,
      items: [],
    }),

    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),

    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },
});

export const {
  setCommentsLoading,
  setComments,
  setCommentsError,
  addComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
