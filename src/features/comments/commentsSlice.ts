/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  submitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  submitting: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const deleteCurrentComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.pending, state => {
      state.hasError = false;
      state.submitting = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.hasError = false;
      state.submitting = false;
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
      state.submitting = false;
    });
  },
});

export const { setComments } = commentSlice.actions;
