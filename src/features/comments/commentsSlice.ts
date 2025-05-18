/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentsApi.getPostComments(postId);
});

export const createCommentThunk = createAsyncThunk(
  'comments/create',
  (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
