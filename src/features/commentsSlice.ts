/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getComments',
  async (postId: number) => {
    const value = await commentsApi.getPostComments(postId);

    return value;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
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

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments
        = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loaded = true;
      })
      .addCase(addCommentAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { deleteComment, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
