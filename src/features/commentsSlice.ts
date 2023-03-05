/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Status } from '../types/Status';

export interface CommentsState {
  comments: Comment[];
  status: Status;
  error: boolean,
}

const initialState: CommentsState = {
  comments: [],
  status: Status.idle,
  error: false,
};

export const loadComments = createAsyncThunk(
  'comments/SET',
  (async (postId: number) => {
    return await getPostComments(postId);
  }),
);

export const addComment = createAsyncThunk(
  'comments/ADD',
  (async (data: Omit<Comment, 'id'>) => {
    return await createComment(data);
  }),
);

export const removeComment = createAsyncThunk(
  'comments/DELETE',
  (async (commentId: number) => {
    return await deleteComment(commentId);
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
        state.status = Status.loading;
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.status = Status.idle;
        state.comments = payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = Status.failed;
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
