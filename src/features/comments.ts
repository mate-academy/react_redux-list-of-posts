/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export interface State {
  loaded: boolean;
  items: Comment[];
  hasError: boolean;
}

const initialState: State = {
  loaded: false,
  items: [],
  hasError: false,
};

export const getCommentsFromServer = createAsyncThunk(
  'comments/fetchComments',
  async (userId: number) => {
    const posts = await getPostComments(userId);

    return posts;
  },
);

export const addCommentToServer = createAsyncThunk(
  'comments/addComment',
  async ({
    name,
    email,
    body,
    postId,
  }: CommentData) => {
    const newComment = await createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteCommentToServer = createAsyncThunk(
  'comments/deleteComment',
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
      .addCase(getCommentsFromServer.pending, state => {
        state.loaded = false;
      })
      .addCase(getCommentsFromServer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getCommentsFromServer.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentToServer.pending, state => {
        state.loaded = false;
      })
      .addCase(addCommentToServer.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.loaded = true;
      })
      .addCase(addCommentToServer.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentToServer.pending, state => {
        state.loaded = false;
      })
      .addCase(deleteCommentToServer.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loaded = true;
      })
      .addCase(deleteCommentToServer.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { actions } = commentsSlice;

export default commentsSlice.reducer;
