/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

type CommentState = {
  items: Comment[];
  pendingDelete?: Comment;
  loaded: boolean;
  hasError: string;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number },
  { rejectValue: string }
>('comments/add', async (data, { rejectWithValue }) => {
  try {
    return await commentsApi.createComment(data);
  } catch (error) {
    return rejectWithValue('Failed to add comment');
  }
});

export const deleteComment = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('comments/delete', async (commentId, { rejectWithValue }) => {
  try {
    await commentsApi.deleteComment(commentId);

    return commentId;
  } catch {
    return rejectWithValue('Failed to delete comment');
  }
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // load
      .addCase(loadComments.pending, state => {
        state.loaded = true;
        state.hasError = '';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Failed to load comments';
      })

      // add
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.hasError =
          action.payload || action.error.message || 'Unknown error';
      })

      // delete
      .addCase(deleteComment.pending, (state, action) => {
        const id = action.meta.arg;

        state.pendingDelete = state.items.find(c => c.id === id);
        state.items = state.items.filter(c => c.id !== id);
      })

      .addCase(deleteComment.fulfilled, state => {
        state.pendingDelete = undefined;
      })
      .addCase(deleteComment.rejected, state => {
        if (state.pendingDelete) {
          state.items.push(state.pendingDelete);
          state.pendingDelete = undefined;
        }
      });
  },
});
