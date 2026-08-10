import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

type NewComment = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

type CommentSliceType = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentSliceType = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: NewComment) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /* eslint-disable no-param-reassign */

    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeComment.pending, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.meta.arg);
      });
  },
});

export default commentsSlice.reducer;
