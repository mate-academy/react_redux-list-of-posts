/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { deleteComment, createComment } from '../api/comments';

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',
  async (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData) => commentsApi.createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
