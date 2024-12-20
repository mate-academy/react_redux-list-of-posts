/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const getComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/create',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deleteAPIComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => deleteComment(commentId),
);

type Users = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: Users = {
  comments: [],
  loaded: true,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    create: () => {},
    delete: (state, action) => {
      deleteComment(action.payload);
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(getComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
