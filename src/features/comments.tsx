/* eslint-disable */
import {
  createAsyncThunk, createSlice
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentEntity from '../api/comments';

type Comments = {
  items: Comment[];
  loaded: boolean;
  isSubmitting: boolean,
  hasError: boolean;
};

const initialComments: Comments = {
  items: [],
  loaded: false,
  hasError: false,
  isSubmitting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setComments.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(setComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(setComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(addComment.pending, (state, _action) => {
      state.isSubmitting = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isSubmitting = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
      state.isSubmitting = false;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  }
});

export default commentsSlice.reducer;

export const setComments = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentEntity.getPostComments(postId);
});
export const addComment = createAsyncThunk('comments/add', (comment: Omit<Comment, 'id'>) => {
  return commentEntity.createComment(comment);
});
export const removeComment = createAsyncThunk('comments/remove', async (commentId: number) => {
  commentEntity.deleteComment(commentId);
  return commentId;
});