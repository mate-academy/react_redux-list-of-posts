/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import type { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;

        state.hasError = false;

        state.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
