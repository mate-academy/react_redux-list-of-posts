/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
  newCommentLoading: boolean,
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
  newCommentLoading: false,
};

export const fetchComment = createAsyncThunk(
  'comments/fetch',
  async (id: number) => commentsApi.getPostComments(id),
);

export const addComment = createAsyncThunk(
  'addComment/fetch',
  async ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => commentsApi.createComment({
    name,
    email,
    body,
    postId,
  }),
);

export const deleteComment = createAsyncThunk(
  'deleteComment/fetch',
  async (id: number) => commentsApi.deleteComment(id),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentState: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: bilder => {
    bilder
      .addCase(fetchComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      });

    bilder
      .addCase(addComment.pending, state => {
        state.newCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.newCommentLoading = false;
        state.items.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { deleteCommentState } = commentsSlice.actions;
