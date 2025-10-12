/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

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

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId, { rejectWithValue }) => {
    try {
      return await commentsApi.getPostComments(postId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async (newComment, { rejectWithValue }) => {
    try {
      return await commentsApi.createComment(newComment);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk<number, number>(
  'comments/delete',
  async (commentId, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(commentId);

      return commentId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(deleteComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
