/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comment/addComment',
  async (newComment: Omit<Comment, 'id'>) => {
    const value = await createComment(newComment);

    return value;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comment/deleteComment',
  async (commentId: number) => {
    deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addCommentAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;
