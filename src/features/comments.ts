/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: string;
  items: Comment[];
  submitting: boolean;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: '',
  items: [],
  submitting: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  ({ name, email, body, postId }: CommentData) => {
    return createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error, Failed to load comments';
      })
      .addCase(addComment.pending, state => {
        state.submitting = true;
        state.hasError = '';
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.submitting = false;
          state.items.push(action.payload);
        },
      )
      .addCase(addComment.rejected, state => {
        state.submitting = false;
        state.hasError = 'Error, Failed to add comment';
      })
      .addCase(removeComment.pending, (state, action) => {
        state.items = state.items.filter(el => el.id !== action.meta.arg);
        state.hasError = '';
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = 'Error, Failed to remove comment';
      });
  },
});

export default commentsSlice.reducer;
