/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CommentData & { postId: number }) => {
    return createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
