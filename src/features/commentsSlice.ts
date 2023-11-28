/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchCommets = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    const comments: Comment[] = await commentsApi.getPostComments(id);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
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
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommets.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchCommets.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchCommets.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { remove } = commentsSlice.actions;
