/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import * as commentsApi from '../api/comments';

type CommentState = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comment/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const remuveComment = createAsyncThunk(
  'comments/delete', async (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const pushComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeCom: (state, action) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = '';
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'No comments yet';
    });

    builder.addCase(pushComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(remuveComment.fulfilled, (state, action) => {
      const commentId = action.payload;

      state.comments = state.comments.filter(comment => (
        comment.id !== commentId
      ));
    });
  },
});

export const { removeCom } = commentsSlice.actions;
export default commentsSlice.reducer;
