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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading: state => {
      return {
        ...state,
        hasError: false,
        loaded: false,
      };
    },

    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
        hasError: false,
        loaded: true,
      };
    },

    setError: state => {
      return {
        ...state,
        items: [],
        hasError: true,
        loaded: true,
      };
    },

    addCommentAction: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },

    deleteCommentAction: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    },
  },
});

export const {
  setComments,
  setError,
  setLoading,
  addCommentAction,
  deleteCommentAction,
} = commentsSlice.actions;

export const addComment = addCommentAction;
export const deleteComment = deleteCommentAction;

export default commentsSlice.reducer;
