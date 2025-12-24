/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: CommentData & { postId: number }) => {
    return commentsApi.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  visible: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    showForm: state => {
      state.visible = true;
    },
    hideForm: state => {
      state.visible = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const { showForm, hideForm } = commentsSlice.actions;
export default commentsSlice.reducer;
