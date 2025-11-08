/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  postId: number | null; // для контроля актуальности
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  postId: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const items = await commentsApi.getPostComments(postId);

    return { items, postId };
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ data, postId }: { data: CommentData; postId: number }) => {
    const created = await commentsApi.createComment({ ...data, postId });

    return created;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
      state.postId = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.items = payload.items;
        state.postId = payload.postId;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(c => c.id !== payload);
      }),
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
