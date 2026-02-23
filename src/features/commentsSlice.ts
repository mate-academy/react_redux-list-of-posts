/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const fetchDeleteComment = createAsyncThunk(
  'comments/fetchDeleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const fetchCreateComment = createAsyncThunk(
  'comments/fetchCreateComment',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

const initialState: {
  comments: Comment[];
  fetchStatus: Status;
  createStatus: Status;
  deleteStatus: Status;
  fetchError: string | null;
  createError: string | null;
  deleteError: string | null;
} = {
  comments: [],
  fetchStatus: 'idle',
  createStatus: 'idle',
  deleteStatus: 'idle',
  fetchError: null,
  createError: null,
  deleteError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch
      .addCase(fetchComments.pending, state => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.fetchError = action.error.message ?? null;
      })

      // Delete
      .addCase(fetchDeleteComment.pending, state => {
        state.deleteStatus = 'loading';
        state.deleteError = null;
      })
      .addCase(fetchDeleteComment.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(fetchDeleteComment.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message ?? null;
      })

      // Create
      .addCase(fetchCreateComment.pending, state => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(fetchCreateComment.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.error.message ?? null;
      });
  },
});

export default commentsSlice.reducer;
