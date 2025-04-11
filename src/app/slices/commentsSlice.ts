/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  getPostComments,
  deleteCommentById,
  createComment,
} from '../../api/comments';

const initialState = {
  loaded: false,
  hasError: false,
  comments: [] as Comment[],
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async postId => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const deleteComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await deleteCommentById(commentId);

    return commentId;
  },
);

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/addComment', async commentData => {
  const newComment = await createComment(commentData);

  return newComment;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
