/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Post } from '../types/Post';

export const getCommentsThunk = createAsyncThunk(
  'comments/get',
  async (id: Post['id']) => getPostComments(id),
);

export const createCommentThunk = createAsyncThunk(
  'comments/create',
  async (data: Omit<Comment, 'id'>) => createComment(data),
);
export const deleteCommentThunk = createAsyncThunk(
  'comments/delete',
  async (id: Comment['id']) => {
    await deleteComment(id);

    return id;
  },
);

type State = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCommentsThunk.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getCommentsThunk.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.hasError = false;
        state.comments = payload;
      })
      .addCase(createCommentThunk.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.comments.push(payload);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.comments = state.comments.filter(({ id }) => id !== payload);
      })
      .addMatcher(isRejected, state => {
        state.comments = [];
        state.loaded = true;
        state.hasError = true;
      });
  },
});
