/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  deleteComment as deleteCommentFromServer,
  createComment,
} from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loading: boolean;
  hasError: string;
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const deleteComments = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteCommentFromServer(commentId);

    return commentId;
  },
);

export const addComments = createAsyncThunk(
  'comments/addComment',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.hasError = '';
      state.items = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.hasError = '';
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = 'Something went wrong';
      state.loading = false;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
