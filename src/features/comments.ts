/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[] | [];
  loading: string;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loading: '',
  error: false,
};

export const commentsInit = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

export const addNewCommentFromServer = createAsyncThunk(
  'comments/add',
  async (newComment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newComment);

    return createdComment;
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(commentsInit.pending, state => {
        state.loading = 'loading';
      })
      .addCase(commentsInit.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = '';
      })
      .addCase(commentsInit.rejected, state => {
        state.loading = '';
        state.error = true;
      });

    builder
      .addCase(addNewCommentFromServer.pending, state => {
        state.loading = 'add';
      })
      .addCase(addNewCommentFromServer.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.loading = '';
      })
      .addCase(addNewCommentFromServer.rejected, state => {
        state.loading = '';
        state.error = true;
      });

    builder
      .addCase(deleteCommentFromServer.pending, state => {
        state.loading = 'delete';
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => {
          return comment.id !== action.payload;
        });
        state.loading = '';
      })
      .addCase(deleteCommentFromServer.rejected, state => {
        state.loading = '';
        state.error = true;
      });
  },
});

export default commentsSlice.reducer;
