/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';
import { RootState } from '../../app/store';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await commentsApi.getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CommentData) => {
    return commentsApi.createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comment/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Adding/Removing comments
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.hasError = false;
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.fulfilled, state => {
        state.hasError = false;
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.pending, (state, action) => {
        const id = action.meta.arg;

        state.items = state.items.filter(curComment => curComment.id !== id);
      })
      // Loading comments
      .addCase(commentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(commentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(commentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const postComments = (state: RootState) => state.comments.items;
export const commentsLoaded = (state: RootState) => state.comments.loaded;
export const commentsHasError = (state: RootState) => state.comments.hasError;

export default commentSlice.reducer;
