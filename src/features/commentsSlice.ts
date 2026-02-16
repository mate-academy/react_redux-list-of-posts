/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

import * as commentsApi from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: CommentData) => {
    try {
      const newComment = await commentsApi.createComment(data);

      return newComment;
    } catch (error) {
      throw new Error();
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    try {
      await commentsApi.deleteComment(id);

      return id;
    } catch (error) {
      throw new Error();
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(deleteComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
