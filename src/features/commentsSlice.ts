/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { Comment } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';

export type CommentsState = {
  comments: Comment[];
  status: Status;
};

const initialState: CommentsState = {
  comments: [],
  status: Status.IDLE,
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);
export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => deleteComment(commentId),
);
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
