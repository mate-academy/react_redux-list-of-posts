import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startCommentsLoading: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    },

    setComments: (_state, action: PayloadAction<Comment[]>) => {
      return {
        loaded: true,
        hasError: false,
        items: action.payload,
      };
    },

    setCommentsError: state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    },

    clearComments: () => {
      return {
        loaded: false,
        hasError: false,
        items: [],
      };
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },

    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    },
  },
});

export const {
  startCommentsLoading,
  setComments,
  setCommentsError,
  clearComments,
  addComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
