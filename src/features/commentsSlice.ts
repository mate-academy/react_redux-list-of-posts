{
  /* eslint-disable no-param-reassign */
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const deleteCommentOnServer = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const addCommentOnServer = createAsyncThunk(
  'comments/createComment',
  async ({ postId, name, email, body }: Omit<Comment, 'id'>) => {
    return commentsApi.createComment({ postId, name, email, body });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(deleteCommentOnServer.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(deleteCommentOnServer.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(addCommentOnServer.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const actions = commentsSlice.actions;
export default commentsSlice.reducer;
