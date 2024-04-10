/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

import { Comment, CommentData } from '../../types/Comment';

export interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Comment | number;
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: 0,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchcomments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/createcomment',
  async (data: CommentData) => {
    const value = await createComment(data);

    return value;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deletecomment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createCommentAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.loaded = true;
      })
      .addCase(createCommentAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const selectcomments = (state: RootState) => {
  return {
    comments: state.comments.items,
    loaded: state.comments.loaded,
    hasError: state.comments.hasError,
  };
};

export default commentsSlice.reducer;
