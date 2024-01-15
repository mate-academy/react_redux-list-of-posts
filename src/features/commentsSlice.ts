/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { createComment, getPostComments } from '../api/comments';

interface State {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: State = {
  items: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (post: Post) => {
  return getPostComments(post.id);
});

export const addComment = createAsyncThunk(
  'comments/addComment',
  (comment: CommentData & { postId: number }) => {
    return createComment(comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    deleteComment(commentId);
  },
);

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
  },
});

export default comments.reducer;
