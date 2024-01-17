/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteOneComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  setLoading,
  setHasError,
  addNewComment,
  deleteOneComment,
} = commentsSlice.actions;
