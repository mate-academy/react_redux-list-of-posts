import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsLoading: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
        items: [],
      };
    },

    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
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
  setCommentsLoading,
  setComments,
  setCommentsError,
  addComment,
  deleteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
