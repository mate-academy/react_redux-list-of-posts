/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.loading = true;
      state.hasError = false;
    },
    addCommentAction: (state, action) => {
      state.comments.push(action.payload);
    },
    removeCommentAction: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setError: (state) => {
      state.hasError = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const {
  clearComments,
  addCommentAction,
  removeCommentAction,
  setError,
} = commentsSlice.actions;
export default commentsSlice.reducer;
