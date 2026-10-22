/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const postComment = createAsyncThunk(
  'comment/post',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comment/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(postComment.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});
