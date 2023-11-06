/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  submitting: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  submitting: false,
};

export const commentsFromServerAsync = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const addCommentToServer = createAsyncThunk(
  'comments/addComment',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(commentsFromServerAsync.pending, (state) => {
        state.loaded = true;
      })
      .addCase(commentsFromServerAsync.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(commentsFromServerAsync.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(addCommentToServer.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addCommentToServer.fulfilled, (state, action) => {
        state.submitting = false;
        state.items.push(action.payload);
      })
      .addCase(addCommentToServer.rejected, (state) => {
        state.submitting = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
