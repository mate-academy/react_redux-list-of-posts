/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  deletedComment: Comment | null;
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  deletedComment: null,
  loading: false,
  error: '',
};

export const loadPostComments = createAsyncThunk<Comment[], number>(
  'comments/fetchByPost',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const createComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/create', async commentData => {
  return commentsApi.createComment(commentData);
});

export const deleteComment = createAsyncThunk<void, number>(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(loadPostComments.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(createComment.rejected, state => {
      state.error = 'Something went wrong';
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      const id = action.meta.arg;

      state.deletedComment = state.comments.find(c => c.id === id) || null;
      state.comments = state.comments.filter(c => c.id !== id);
    });
    builder.addCase(deleteComment.fulfilled, state => {
      state.deletedComment = null;
    });
    builder.addCase(deleteComment.rejected, state => {
      if (state.deletedComment) {
        state.comments.push(state.deletedComment);
        state.deletedComment = null;
      }
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = {
  ...commentsSlice.actions,
  loadPostComments,
  createComment,
  deleteComment,
};
