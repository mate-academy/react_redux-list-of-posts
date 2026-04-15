/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
// src/app/slices/commentsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export const fetchComments = createAsyncThunk('comments/fetch', (id: number) =>
  commentsApi.getPostComments(id),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (d: { postId: number; comment: CommentData }) =>
    commentsApi.createComment({ ...d.comment, postId: d.postId }),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (d: { commentId: number; postId: number }) => {
    await commentsApi.deleteComment(d.commentId);

    return d;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: {} as Record<number, Comment[]>,
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // 1. Спочатку ЗАВЖДИ йдуть .addCase()
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items[action.meta.arg] = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loaded = true;
        const { postId } = action.payload;

        if (!state.items[postId]) {
          state.items[postId] = [];
        }

        state.items[postId].push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loaded = true;
        const { postId, commentId } = action.payload;

        if (state.items[postId]) {
          state.items[postId] = state.items[postId].filter(
            c => c.id !== commentId,
          );
        }
      })
      // 2. Потім додаємо .addMatcher()
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loaded = false;
          state.hasError = false;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.loaded = true;
          state.hasError = true;
        },
      );
  },
});

export default commentsSlice.reducer;
