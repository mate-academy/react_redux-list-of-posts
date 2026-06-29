/* eslint-disable no-param-reassign */
import { Comment, CommentData } from '../types/Comment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const getAllComments = createAsyncThunk(
  'comments/getAllComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentCreate = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData & { postId: number }) => {
    return createComment(data);
  },
);

export const commentDelete = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(getAllComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(getAllComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(commentCreate.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = true;
    });
    builder.addCase(commentDelete.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { removeComment } = commentsSlice.actions;
