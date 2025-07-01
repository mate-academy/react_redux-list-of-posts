/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  postId => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/addComment', async data => {
  const newComment = await commentsApi.createComment(data);

  return newComment;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    });

    builder.addCase(deleteComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
