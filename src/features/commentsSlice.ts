/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  statusGet: Status;
  statusAdd: Status;
  statusDel: Status;
}

const initialState: CommentsState = {
  comments: [],
  statusGet: Status.Inaction,
  statusAdd: Status.Inaction,
  statusDel: Status.Inaction,
};

export const getCommentsAsyncBy = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => getPostComments(postId),
);

export const addCommentAsyncBy = createAsyncThunk(
  'comments/addComments',
  async (newComment: Comment) => createComment(newComment),
);

export const deleteCommentAsyncBy = createAsyncThunk(
  'comments/deleteComments',
  async (postId: number) => deleteComment(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsyncBy.pending, (state) => {
        state.statusGet = Status.Loading;
      })
      .addCase(getCommentsAsyncBy.fulfilled, (state, action) => {
        state.statusGet = Status.Inaction;
        state.comments = action.payload;
      })
      .addCase(getCommentsAsyncBy.rejected, (state) => {
        state.statusGet = Status.Failed;
      })

      .addCase(addCommentAsyncBy.pending, (state) => {
        state.statusAdd = Status.Loading;
      })
      .addCase(addCommentAsyncBy.fulfilled, (state, action) => {
        state.statusAdd = Status.Inaction;
        state.comments.push(action.payload);
      })
      .addCase(addCommentAsyncBy.rejected, (state) => {
        state.statusAdd = Status.Failed;
      })

      .addCase(deleteCommentAsyncBy.pending, (state) => {
        state.statusDel = Status.Loading;
      })
      .addCase(deleteCommentAsyncBy.fulfilled, (state, action) => {
        state.statusDel = Status.Inaction;
        state.comments.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCommentAsyncBy.rejected, (state) => {
        state.statusDel = Status.Failed;
      });
  },
});

export default commentsSlice.reducer;
