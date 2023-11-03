/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

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
  async ({ name, email, body }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: post.id,
    });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const newComment = await commentsApi.deleteComment(commentId);

    return newComment;
  },
);

export const counterSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment__: () => {},
  },

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

      .addCase(deleteComment.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
