/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

export interface CommentState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

export const initialState: CommentState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComm: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComm: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      commentsApi.deleteComment(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addComm, deleteComm } = commentsSlice.actions;
export default commentsSlice.reducer;
