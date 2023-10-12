/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  isLoaded: boolean;
  isError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoaded: false,
  isError: false,
};

export const getCommentsAsyncBy = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addCommentAsyncBy = createAsyncThunk(
  'comments/addComments',
  (newComment: Omit<Comment, 'id'>) => createComment(newComment),
);

export const deleteCommentAsyncBy = createAsyncThunk(
  'comments/deleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsyncBy.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(getCommentsAsyncBy.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.isError = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsAsyncBy.rejected, (state) => {
        state.isLoaded = true;
        state.isError = true;
      })

      .addCase(addCommentAsyncBy.fulfilled, (state, action) => {
        state.isError = false;
        state.comments.push(action.payload);
      })
      .addCase(addCommentAsyncBy.rejected, (state) => {
        state.isError = true;
      })

      .addCase(deleteCommentAsyncBy.fulfilled, (state, action) => {
        state.isError = false;
        state.comments = state.comments.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCommentAsyncBy.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default commentsSlice.reducer;
