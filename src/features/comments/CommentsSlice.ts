/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export const getCommentAsync = createAsyncThunk(
  'comments/get', (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/add',
  ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => createComment({
    name,
    email,
    body,
    postId,
  }),
);

export const removeCommentAsync = createAsyncThunk(
  'comments/remove', (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCommentAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(getCommentAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });

    builder.addCase(addCommentAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
    });

    builder.addCase(addCommentAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });

    builder.addCase(removeCommentAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeCommentAsync.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
      state.loading = false;
    });

    builder.addCase(removeCommentAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
