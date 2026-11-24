/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/createComments',
  async (data: Omit<Comment, 'id'>) => {
    const value = await createComment(data);

    return value;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Comment[],
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = true;
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
      state.loaded = true;
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});
