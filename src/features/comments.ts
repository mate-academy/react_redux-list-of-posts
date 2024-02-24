/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk('comments/fetch', (
  postId: number,
) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk('comments/add', (
  newComment: Omit<Comment, 'id'>,
) => {
  return createComment(newComment);
});

export const removeComment = createAsyncThunk('comments/delete', (
  commentId: number,
) => {
  return deleteComment(commentId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteFromState: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(initComments.fulfilled, (
      state,
      action: PayloadAction<Comment[]>,
    ) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments.filter(comment => comment.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
