/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPostComments = createAsyncThunk<Comment[], number>(
  'comments/fetchPostComments',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const createComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/createComment', data => commentsApi.createComment(data));

export const removeComment = createAsyncThunk<number, number>(
  'comments/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createComment.rejected, state => {
        state.hasError = true;
      })
      // Optimistic deletion: remove from UI immediately on pending
      .addCase(removeComment.pending, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.meta.arg);
      });
  },
});

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;
export default commentsSlice.reducer;
