import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

/* eslint-disable no-param-reassign */

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deleteCom = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const commentToDelete = await deleteComment(commentId);

    return commentToDelete ? commentId : null;
  },
);

const initialState = {
  loaded: true,
  hasError: false,
  items: [] as Comment[],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.pending, state => {
      // state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = [...state.items, action.payload];
    });

    builder.addCase(addComment.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(deleteCom.pending, state => {
      // state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(deleteCom.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(deleteCom.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});
