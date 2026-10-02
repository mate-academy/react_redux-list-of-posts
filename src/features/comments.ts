/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

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
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => commentsApi.createComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => commentsApi.deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.items = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        // we show an error message in case of any error
        state.hasError = true;
      })
      // we delete the comment immediately so as
      // not to make the user wait long for the actual deletion
      .addCase(deleteComment.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export default commentsSlice.reducer;
