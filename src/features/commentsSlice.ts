import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as delComment,
  getPostComments,
} from '../api/comments';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */

const initialState = {
  items: [] as Comment[],
  hasError: '',
  loaded: false,
};

export const fetchComments = createAsyncThunk(
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

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await delComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.hasError = action.error.message || 'Something went wrong';
      state.loaded = false;
    });

    builder.addCase(addComment.pending, state => {
      state.loaded = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.hasError = action.error.message || 'Something went wrong';
      state.loaded = false;
    });

    builder.addCase(deleteComment.pending, state => {
      state.loaded = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.loaded = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.hasError = action.error.message || 'Something went wrong';
      state.loaded = false;
    });
  },
});

export default commentsSlice.reducer;
