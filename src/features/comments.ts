/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadPostComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addPostComment = createAsyncThunk(
  'comments/createComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delete: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadPostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(addPostComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
