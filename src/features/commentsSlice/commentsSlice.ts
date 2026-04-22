import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadCommentsByPost = createAsyncThunk(
  'comments/loadCommentsByPost',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  ({ data, postId }: { data: CommentData; postId: number }) => {
    return createComment({
      ...data,
      postId,
    });
  },
);

export const deleteComm = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCommentsByPost.pending, state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadCommentsByPost.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadCommentsByPost.rejected, state => {
      state.items = [];
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(deleteComm.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
    builder.addCase(deleteComm.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;
