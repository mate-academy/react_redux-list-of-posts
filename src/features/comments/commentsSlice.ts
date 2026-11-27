/* eslint-disable no-param-reassign */
import * as commentsApi from '../../api/comments';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => commentsApi.getPostComments(postId),
);
export const addComment = createAsyncThunk(
  'comments.add',
  (data: Omit<Comment, 'id'>) => commentsApi.createComment(data),
);
export const removeComment = createAsyncThunk(
  'comments.remove',
  (commentId: number) => commentsApi.deleteComment(commentId),
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(c => c.id !== action.meta.arg);
    });
  },
});

export default commentSlice.reducer;
