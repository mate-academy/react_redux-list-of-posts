/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

// Асинхронний thunk для завантаження коментарів
export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.comments = [];
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.hasError = false;
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.hasError = false;
      state.comments = state.comments.filter(com => com.id !== action.payload);
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
