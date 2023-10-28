/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  hasUpdatedError: boolean,
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
  hasUpdatedError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch', async (postId: number) => {
    const postsComments = await commentsApi.getPostComments(postId);

    return postsComments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add', async ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    const newComment: Comment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete', async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.hasUpdatedError = false;
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.hasUpdatedError = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.hasUpdatedError = true;
      })
      .addCase(addComment.pending, (state) => {
        state.hasUpdatedError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state) => {
        state.hasUpdatedError = true;
      });
  },
});

export default commentsSlice.reducer;
