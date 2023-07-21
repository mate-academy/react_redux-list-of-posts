/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments }
  from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { AsyncStatus } from '../../types/AsyncStatus';

export interface CommentsState {
  value: Comment[],
  status: AsyncStatus,
}

const initialState: CommentsState = {
  value: [],
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'comments/fetchComments-get',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    // The value we return becomes the `fulfilled` action payload
    return comments;
  },
);

export const deleteAsync = createAsyncThunk(
  'comments/fetchComments-delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/fetchComments-post',
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
        state.status = AsyncStatus.LOADING;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = state.value.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.status = AsyncStatus.NEWCOMMENTLOADING;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions } = commentsSlice;
