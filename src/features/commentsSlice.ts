/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const createCommentsAsync = createAsyncThunk(
  'comments/createComments',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deleteCommentsAsync = createAsyncThunk(
  'comments/deleteComments',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments
        = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentsAsync.pending, (state) => {
        state.loaded = false;
      })
      .addCase(commentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(commentsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
    builder
      .addCase(createCommentsAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createCommentsAsync.rejected, (state) => {
        state.hasError = true;
      });
    builder
      .addCase(deleteCommentsAsync.fulfilled, () => {});
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
