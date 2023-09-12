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
  status: Status.idle,
};

export const commentsAdd = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);
export const commentsRemove = createAsyncThunk(
  'comments/remove',
  (commentId: number) => deleteComment(commentId),
);
export const commentsFetch = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRemoveFast: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentsAdd.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(commentsRemove.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(commentsFetch.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(commentsFetch.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.comments = action.payload;
      })
      .addCase(commentsFetch.rejected, (state) => {
        state.status = Status.failed;
      });
  },
});

export const { commentsRemoveFast } = commentsSlice.actions;
export default commentsSlice.reducer;
