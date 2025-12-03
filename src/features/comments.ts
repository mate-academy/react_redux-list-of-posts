/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostComment, PostCommentData } from '../types/PostComment';
import { getPostComments } from '../api/comments';

type State = {
  comments: [] | PostComment[];
  loading: boolean;
  hasError: boolean;
};

const initialState: State = {
  comments: [],
  loading: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
    addNewComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
      state.hasError = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const { deleteComment, addNewComment } = commentsSlice.actions;

export default commentsSlice.reducer;
