/* eslint-disable no-param-reassign */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

import * as commentsApi from '../api/comments';

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  newCommentLoading: boolean;
};

const initialState: InitialState = {
  loaded: true,
  newCommentLoading: false,
  hasError: false,
  comments: [],
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.pending, state => {
      state.newCommentLoading = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.newCommentLoading = false;
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
      state.newCommentLoading = false;
    });

    builder.addCase(deleteCommentFromServer.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export const { actions } = commentsSlice;

export default commentsSlice.reducer;
