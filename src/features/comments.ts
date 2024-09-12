/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[] | [];
  isLoading: boolean; // Changed to boolean
  isAdding: boolean; // Separate state for adding comments
  isDeleting: boolean; // Separate state for deleting comments
  hasError: boolean; // Boolean for error state
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false, // Initial state set to false
  isAdding: false,
  isDeleting: false,
  hasError: false,
};

export const commentsInit = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

export const addNewCommentFromServer = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newComment);

    return createdComment;
  },
);

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
    builder
      // Fetching comments
      .addCase(commentsInit.pending, state => {
        state.isLoading = true;
        state.hasError = false; // Reset error state on new request
      })
      .addCase(commentsInit.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(commentsInit.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });

    // Adding a new comment
    builder
      .addCase(addNewCommentFromServer.pending, state => {
        state.isAdding = true;
        state.hasError = false;
      })
      .addCase(addNewCommentFromServer.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isAdding = false;
      })
      .addCase(addNewCommentFromServer.rejected, state => {
        state.isAdding = false;
        state.hasError = true;
      });

    // Deleting a comment
    builder
      .addCase(deleteCommentFromServer.pending, state => {
        state.isDeleting = true;
        state.hasError = false;
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.isDeleting = false;
      })
      .addCase(deleteCommentFromServer.rejected, state => {
        state.isDeleting = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
