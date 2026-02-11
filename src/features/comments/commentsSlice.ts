/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

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

export const loadCommentsByPost = createAsyncThunk(
  'comments/loadByPost',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk<
  Comment,
  { postId: number } & CommentData
>('comments/add', ({ postId, ...data }) => createComment({ ...data, postId }));

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadCommentsByPost.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
