/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  items: Comment[];
  postId: number | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState = {
  items: [] as Comment[],
  postId: null,
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ data, postId }: { data: CommentData; postId: number }) => {
    const newComment = await commentsApi.createComment({ ...data, postId });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(addComment.pending, state => {
        state.hasError = false;
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
