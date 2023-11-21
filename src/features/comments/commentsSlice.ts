/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

type InitialState = {
  comments: Comment[],
  loaded:boolean,
  hasError:boolean,
};

const initialState:InitialState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId:number) => {
  return getPostComments(postId);
});

export const add = createAsyncThunk('comments/add',
  async ({
    name, email, body, postId,
  }: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  });

export const deleteComment = createAsyncThunk('comment/delete',
  (commentId:number) => {
    commentsApi.deleteComment(commentId);
  });

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = true;
      state.comments = [];
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
      state.comments = [];
    });
    builder.addCase(add.fulfilled, (state, action) => {
      state.loaded = false;
      state.hasError = false;
      state.comments.push(action.payload);
    });
    builder.addCase(add.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
      state.comments = [];
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter((comment:Comment) => comment.id !== action.meta.arg);
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
