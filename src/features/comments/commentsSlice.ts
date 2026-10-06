/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from "../../types/Comment";
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

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

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => commentsApi.deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(loadComments.pending, state => {
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
      state.hasError = true;
    })
    .addCase(removeComment.pending, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
  },
});

export default commentsSlice.reducer;
