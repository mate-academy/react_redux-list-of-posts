import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',

  initialState,

  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
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

    startLoadingComments: state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    },
  },
});

export const {
  setComments,
  setCommentsError,
  addComment,
  deleteComment,
  startLoadingComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
