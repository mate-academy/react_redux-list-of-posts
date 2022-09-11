import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  selectedPostId: number | null,
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  submitting: boolean,
}

const initialState: CommentsState = {
  selectedPostId: null,
  comments: [],
  loaded: false,
  hasError: false,
  submitting: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  getPostComments,
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete_comment',
  deleteComment,
);

export const addNewComment = createAsyncThunk(
  'comments/add_new_comment',
  createComment,
);

/* eslint-disable no-param-reassign */

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setSelectPostId(state, action) {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(deleteCommentById.pending, (state, action) => {
      state.comments = state.comments
        .filter(({ id }) => id !== action.meta.arg);
    });

    builder.addCase(deleteCommentById.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(addNewComment.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.comments.push({ ...action.payload });
      state.submitting = false;
    });

    builder.addCase(addNewComment.rejected, (state) => {
      state.hasError = true;
      state.submitting = false;
    });
  },
});

export const selectors = {
  getComments: (state: CommentsState) => state.comments,
  getCommentsState: (state: CommentsState) => state,
  getSelectedPostId: (state: CommentsState) => state.selectedPostId,
  getSubmiting: (state: CommentsState) => state.submitting,
};

export default commentsSlice.reducer;
export const { setSelectPostId } = commentsSlice.actions;
