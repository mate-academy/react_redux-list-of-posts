/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

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

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/fetchAdd',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const clearComment = createAsyncThunk(
  'comments/fetchClear',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlise = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(clearComment.pending, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.meta.arg);
    });
  },
});

export default commentsSlise.reducer;
