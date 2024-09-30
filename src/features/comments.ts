/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[] | [];
  isLoading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: false,
};

// Thunk to fetch comments for a specific post
export const commentsInit = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

// Thunk to add a new comment
export const addNewCommentFromServer = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newComment);

    return createdComment;
  },
);

// Thunk to delete a comment
export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch comments
    builder
      .addCase(commentsInit.pending, state => {
        state.isLoading = true;
      })
      .addCase(commentsInit.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(commentsInit.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });

    // Add new comment
    builder
      .addCase(addNewCommentFromServer.pending, state => {
        state.isLoading = true;
      })
      .addCase(addNewCommentFromServer.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isLoading = false;
      })
      .addCase(addNewCommentFromServer.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });

    // Delete comment
    builder
      .addCase(deleteCommentFromServer.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.isLoading = false;
      })
      .addCase(deleteCommentFromServer.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default commentsSlice.reducer;
