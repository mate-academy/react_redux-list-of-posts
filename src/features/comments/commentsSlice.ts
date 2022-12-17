/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string;
  submitting: boolean;
  newComment: NewComment | null;
  deletedCommentId: number | null;
  errorNewComment: string;
}

type NewComment = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
  submitting: false,
  newComment: null,
  deletedCommentId: null,
  errorNewComment: '',
};

export const initComments = createAsyncThunk(
  'comments/fetchLoad',
  (id: number) => getPostComments(id),
);

export const addNewComment = createAsyncThunk(
  'comments/fetchCreate',
  (comment: NewComment) => createComment(comment),
);

export const removeComment = createAsyncThunk(
  'comments/fetchRemove',
  (id: number) => deleteComment(id),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setDeletedCommentId: (state, action: PayloadAction<number>) => {
      state.deletedCommentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(initComments.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      })
      .addCase(addNewComment.pending, (state) => {
        state.submitting = true;
        state.errorNewComment = '';
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addNewComment.rejected, (state) => {
        state.errorNewComment = 'Something went wrong';
        state.submitting = false;
      })
      .addCase(removeComment.pending, (state) => {
        state.errorNewComment = '';
      })
      .addCase(removeComment.fulfilled, (state) => {
        state.comments = state.comments.filter(
          comment => comment.id !== state.deletedCommentId,
        );
      })
      .addCase(removeComment.rejected, (state) => {
        state.errorNewComment = 'Something went wrong';
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
