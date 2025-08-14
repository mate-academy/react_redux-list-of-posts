/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/return-await */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/loadComments',

  async (postId: number) => {
    return await getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComments',

  async (commentData: CommentData & { postId: number }) => {
    return await createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComments',

  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.pending, state => {
        state.hasError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.hasError = false;
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
