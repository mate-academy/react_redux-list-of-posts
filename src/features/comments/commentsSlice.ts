/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

import * as commentsApi from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/create',
  async (newCommentData: CommentData & { postId: number }) => {
    const createdComment = await commentsApi.createComment(newCommentData);

    return createdComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      },
    );

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(createNewComment.pending, state => {
      state.hasError = false;
    });

    builder.addCase(
      createNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );

    builder.addCase(createNewComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.pending, (state, action) => {
      state.hasError = false;
      state.items = state.items.filter(
        comment => comment.id !== action.meta.arg,
      );
    });

    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
