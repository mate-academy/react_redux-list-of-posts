/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPostComments } from '../api/comments';

import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
