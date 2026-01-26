/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

type CommentState = {
  comments: Comment[];
  pendingDelete?: Comment;
  loading: boolean;
  error: string;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: '',
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
        state.loading = true;
        state.error = '';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load comments';
      })

      // add
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload || action.error.message || 'Unknown error';
      })

      // delete
      .addCase(deleteComment.pending, (state, action) => {
        const id = action.meta.arg;

        state.pendingDelete = state.comments.find(c => c.id === id);
        state.comments = state.comments.filter(c => c.id !== id);
      })

      .addCase(deleteComment.fulfilled, state => {
        state.pendingDelete = undefined;
      })
      .addCase(deleteComment.rejected, state => {
        if (state.pendingDelete) {
          state.comments.push(state.pendingDelete);
          state.pendingDelete = undefined;
        }
      });
  },
});
