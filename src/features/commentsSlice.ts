/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentState {
  comments: Comment[],
  isLoaded: boolean,
  hasError: boolean,
  newCommentLoaded: boolean,
}

const initialState: CommentState = {
  comments: [],
  isLoaded: false,
  hasError: false,
  newCommentLoaded: false,
};

export const fetchCommets = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    return commentsApi.getPostComments(id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(newComment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await commentsApi.deleteComment(id);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommets.pending, state => {
        state.isLoaded = false;
      })
      .addCase(fetchCommets.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchCommets.rejected, state => {
        state.isLoaded = true;
        state.hasError = true;
      });
    builder
      .addCase(addComment.pending, state => {
        state.newCommentLoaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.newCommentLoaded = false;
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { remove } = commentsSlice.actions;
