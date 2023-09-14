/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type PostState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialComments: PostState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk('comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  });

export const addComment = createAsyncThunk('comment/add',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  });

export const removeComment = createAsyncThunk('comment/delete',
  (commentId: number, { dispatch }) => {
    dispatch(deleteCommentById(commentId));

    return deleteComment(commentId);
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },

    deleteCommentById: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments.push(action.payload);
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(removeComment.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.loaded = true;
    });

    builder.addCase(removeComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { clearComments, deleteCommentById } = commentsSlice.actions;

export default commentsSlice.reducer;
