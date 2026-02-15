import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type СommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: СommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    setCommentError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    setCommentLoader: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
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

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
