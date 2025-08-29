/* eslint-disable @typescript-eslint/indent */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
};

export type CommentData = {
  name: string;
  email: string;
  body: string;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/addComment', async ({ postId, ...data }) => {
  return commentsApi.createComment({ postId, ...data });
});

export const deleteCommentAsync = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },

    addComment: (state, action) => {
      state.comments.push(action.payload);
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.isLoading = false;
      state.error = 'Failed to fetch posts';
    });

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to add comment';
    });

    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    });
    builder.addCase(deleteCommentAsync.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to delete comment';
    });
  },
});

export const { setComments, addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
