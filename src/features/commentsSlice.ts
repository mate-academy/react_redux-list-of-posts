/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const setCommentsPosts = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCom: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteCom: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(com => com.id !== action.payload);
    },
    setCommentError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setCommentsPosts.pending, state => ({
      ...state,
      loaded: false,
    }));
    builder.addCase(setCommentsPosts.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loaded: true,
    }));
    builder.addCase(setCommentsPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export const commentsActions = commentsSlice.actions;
