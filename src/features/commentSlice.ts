/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type InitialState = {
  comments: Comment[];
  hasError: boolean;
  loaded: boolean;
  visible: boolean;
  submitting: boolean;
};

const initialState: InitialState = {
  comments: [],
  hasError: false,
  loaded: false,
  visible: false,
  submitting: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const createComment = createAsyncThunk(
  'comments/create',
  (newCommentData: CommentData & { postId: number }) => {
    return commentsApi.createComment(newCommentData);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });
    builder.addCase(initComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(createComment.pending, state => {
      state.hasError = false;
      state.submitting = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.submitting = false;
      state.comments.push(action.payload);
    });
    builder.addCase(createComment.rejected, state => {
      state.hasError = true;
      state.submitting = false;
    });
    builder.addCase(deleteComment.pending, state => {
      state.hasError = false;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const commentId = action.payload;

      state.comments = state.comments.filter(
        comment => comment.id != commentId,
      );
    });
    builder.addCase(deleteComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentSlice.reducer;
export const { setVisible, clearComments } = commentSlice.actions;
