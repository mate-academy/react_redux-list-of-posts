/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface ComentsState {
  comments: Comment[];
  hasError?: boolean;
  loaded: boolean;
}

const initialState: ComentsState = {
  comments: [],
  hasError: false,
  loaded: false,
};

const fetchComents = createAsyncThunk('coments/fetch', (id: number) => {
  return commentsApi.getPostComments(id);
});

const addComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

const deleteComment = createAsyncThunk(
  'coments/deleteComment',
  (id: number) => {
    return commentsApi.deleteComment(id);
  },
);

export const comentsSlice = createSlice({
  name: 'coments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComents.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComents.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComents.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.pending, (state) => {
        state.loaded = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loaded = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedCommentId = action.meta.arg;

        state.loaded = true;
        state.comments = state.comments.filter(
          (comment) => comment.id !== deletedCommentId,
        );
      });
  },
});

export default comentsSlice.reducer;

export const commentsCrud = { fetchComents, addComment, deleteComment };
