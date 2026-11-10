/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
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

export const init = createAsyncThunk('comments/fetch', (postId: number) =>
  commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => commentsApi.createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (commentId: number) => commentsApi.deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: builder => {
    // load
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    // add
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    // remove: optimistic, we delete the comment immediately (on `pending`)
    builder.addCase(removeComment.pending, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
  },
});

export const { clear: clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
