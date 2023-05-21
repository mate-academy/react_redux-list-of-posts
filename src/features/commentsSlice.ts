/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type CommentsState = {
  items: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => getPostComments(postId),
);

export const postComment = createAsyncThunk(
  'post/comment',
  (props: Omit<Comment, 'id'>) => createComment(props),
);

export const removeComment = createAsyncThunk(
  'delete/comment',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(initComments.rejected, (state) => {
      state.hasError = false;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(postComment.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.meta.arg);
    });
    builder.addCase(removeComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
