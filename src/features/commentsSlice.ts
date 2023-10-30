/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const setComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const pushComment = createAsyncThunk(
  'comments/push',
  async (newComment: Comment) => {
    const {
      postId,
      name,
      email,
      body,
    } = newComment;

    await createComment({
      postId,
      name,
      email,
      body,
    });

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (postId: number) => {
    deleteComment(postId);

    return postId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(setComments.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(pushComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(pushComment.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
