/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchCommentAsync = createAsyncThunk(
  'comments/fetchComment',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchCommentAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchCommentAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchCommentAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, state => {
        state.hasError = true;
      });

    builder
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
