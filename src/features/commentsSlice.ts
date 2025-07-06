/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add',
  (payload: Omit<Comment, 'id'>) => {
    return createComment(payload);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(addComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addComment.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(removeComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeComment.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default commentsSlice.reducer;
