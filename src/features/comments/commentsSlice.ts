/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async ({
    postId,
    commentData,
  }: {
    postId: number;
    commentData: CommentData;
  }) => {
    return commentsApi.createComment({
      ...commentData,
      postId,
    });
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteCommentAsync.pending, (state, action) => {
        const commentId = action.meta.arg;

        state.items = state.items.filter(comment => comment.id !== commentId);
      });
  },
});

export default commentsSlice.reducer;
