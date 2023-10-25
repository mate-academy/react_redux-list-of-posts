/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk('comments/fetch',
  async (postId: number) => {
    if (postId) {
      const comments = await getPostComments(postId);

      return comments;
    }

    return [];
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state) => {
      state.hasError = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setError, setComment, removeComment } = commentsSlice.actions;
