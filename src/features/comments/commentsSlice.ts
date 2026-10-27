/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

type CommentsStateType = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsStateType = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const createCommentThunk = createAsyncThunk(
  'comments/createComment',
  (data: CommentData & { postId: number }) => createComment(data),
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(createCommentThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    // Optimistic delete: remove from UI immediately (before the request finishes)
    builder.addCase(deleteCommentThunk.pending, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
  },
});
