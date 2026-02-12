/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { CommentsState } from '../../types/types';

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: CommentData & { postId: number }) => {
    const newComment = await commentsApi.createComment(commentData);

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.hasError = false;
          state.comments = action.payload;
        },
      )
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )
      .addCase(createComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
