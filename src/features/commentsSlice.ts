/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
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
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.error = 'Error';
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, state => {
        state.error = 'Error';
      });
  },
});

export const commentReducer = commentsSlice.reducer;
