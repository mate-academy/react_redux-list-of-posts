/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import * as commentsApi from '../api/comments';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Comment[],
};

export const loadPostComments = createAsyncThunk(
  'comments/fetch',
  async (postId: Post['id']) => {
    return getPostComments(postId);
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deleteComment',
  async (comment: Comment) => {
    if (!comment.id) throw new Error();
    return commentsApi.deleteComment(comment.id);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<Comment['id']>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPostComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadPostComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(deletePostComment.pending, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg.id,
      );
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(deletePostComment.rejected, (state, action) => {
      state.items.push(action.meta.arg);
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(deletePostComment.fulfilled, state => {
      state.loaded = true;
    });
  },
});
