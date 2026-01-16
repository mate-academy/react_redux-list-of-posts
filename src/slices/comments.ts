/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComment = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async data => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk<number, number>(
  'comments/delete',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComment(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComment.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loaded = true;
      })

      .addCase(fetchComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      .addCase(removeComment.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(c => c.id !== payload);
      }),
});

export const { resetComment } = commentSlice.actions;

export default commentSlice.reducer;
