/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments }
  from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export enum AsyncStatus {

}

export interface CommentsState {
  value: Comment[],
  status: 'idle' | 'loading' | 'failed',
}

const initialState: CommentsState = {
  value: [],
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    // The value we return becomes the `fulfilled` action payload
    return comments;
  },
);

export const deleteAsync = createAsyncThunk(
  'comments/fetchComments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/fetchComments/post',
  async ({
    name, email, body, postId: selectedPostId,
  }: CommentData) => {
    const newComment = await createComment({
      name,
      email,
      body,
      postId: selectedPostId,
    });

    return newComment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = state.value.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { reducer, actions } = commentsSlice;
