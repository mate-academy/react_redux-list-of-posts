// src/features/commentsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/loadComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

// eslint-disable-next-line max-len, prettier/prettier
export const addComment = createAsyncThunk< Comment, { postId: number; data: CommentData }
>('comments/addComment', async ({ postId, data }) => {
  const newComment = await commentsApi.createComment({
    ...data,
    postId,
  });

  return newComment;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(loadComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const id = action.payload;

        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(c => c.id !== id);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

// selectors
export const selectComments = (state: RootState) => state.comments.items;
// eslint-disable-next-line max-len
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;
