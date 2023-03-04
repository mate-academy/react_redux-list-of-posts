/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean,
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: false,
};

export const loadComments = createAsyncThunk(
  'users/SET',
  (async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  }),
);

export const addComment = createAsyncThunk(
  'users/ADD',
  (async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  }),
);

export const removeComment = createAsyncThunk(
  'users/DELETE',
  (async (commentId: number) => {
    const commentToRemove = await deleteComment(commentId);

    return commentToRemove;
  }),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.comments = payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.comments = [...state.comments, payload];
      })
      .addCase(removeComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments
          .filter(({ id }) => id !== payload);
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
