/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';
import { RootState } from '../../app/store';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const loadedComments = await getPostComments(postId);

    return loadedComments;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(loadCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadCommentsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
      })
      .addCase(addCommentAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items
          .filter(comment => comment.id !== action.payload);
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.items;
export const selectHasError = (state: RootState) => state.comments.hasError;
export const selectLoaded = (state: RootState) => state.comments.loaded;
