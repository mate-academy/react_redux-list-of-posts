/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { RootState } from '../../app/store';
import * as client from '../../api/comments';

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/addComment',
  comment => {
    return client.createComment(comment);
  },
);

// commentIndex is needed to return a comment to the same place after an optimistic deleting
type CommentThunkArg = {
  comment: Comment;
  commentIndex: number;
};

/* eslint-disable @typescript-eslint/indent, prettier/prettier */
export const deleteComment = createAsyncThunk<
  unknown,
  CommentThunkArg
>(
  'comments/deleteComment',
  async (commentData) => {
    const commentId = commentData.comment.id;

    return client.deleteComment(commentId);
  },
);

export const loadComments = createAsyncThunk<
  Comment[],
  void,
  { state: RootState }
>(
  'comments/loadComments',
  (_, { getState }) => {
    const postId = getState().selectedPost?.id;

    if (!postId) {
      return [];
    }

    return client.getPostComments(postId);
  },
);
/* eslint-disable @typescript-eslint/indent, prettier/prettier */

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(
        loadComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        })
      .addCase(
        addComment.rejected,
        state => {
          state.hasError = true;
        })
      .addCase(
        deleteComment.pending,
        (state, action) => {
          const commentId = action.meta.arg.comment.id;

          state.items = state.items.filter(i => i.id !== commentId);
        })
      .addCase(
        deleteComment.rejected,
        (state, action) => {
          const commentIndex = action.meta.arg.commentIndex;

          state.items.splice(commentIndex, 0, action.meta.arg.comment);
        });
  }
});

export default commentsSlice.reducer;

