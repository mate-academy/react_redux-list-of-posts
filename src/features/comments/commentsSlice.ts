/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';
// import { RootState } from '../../app/store';

export interface CommentsState {
  value: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  value: [],
  status: 'idle',
};

export const loadComments = createAsyncThunk(
  'comments/fetchComments',
  async (id: number) => {
    const value = await commentsApi.getPostComments(id);

    return value;
  },
);

export const addComment = createAsyncThunk(
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

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = [...state.value, ...action.payload];
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = state.value.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
