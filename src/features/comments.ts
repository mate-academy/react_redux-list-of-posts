/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type InitialCommentState = {
  comments: Comment[];
  isLoadingComments: boolean;
  hasCommentError: boolean;
};

const initialCommentState: InitialCommentState = {
  comments: [],
  isLoadingComments: false,
  hasCommentError: false,
};

export const addComment = createAsyncThunk('comments/add', createComment);

export const initDeleteComment = createAsyncThunk(
  'commets/delete',
  deleteComment,
);

export const initComments = createAsyncThunk('comments/fetch', getPostComments);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearCommets: state => {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.isLoadingComments = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.comments = action.payload;
      })
      .addCase(initComments.rejected, state => {
        state.isLoadingComments = false;
        state.hasCommentError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(initDeleteComment.fulfilled, (state, action) => {
        state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export const { removeComment, clearCommets } = commentsSlice.actions;

export default commentsSlice.reducer;
