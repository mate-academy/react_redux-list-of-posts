/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
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

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [] as Comment[],
};

export const loadPostComments = createAsyncThunk(
  'comments/loadPostComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })
      .addCase(addComment.pending, state => {
        state.hasError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.hasError = false;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.pending, state => {
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.hasError = false;
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
