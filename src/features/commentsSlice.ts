import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentFromServer,
} from '../api/comments';
import { Comment } from '../types/Comment';
/* eslint-disable no-param-reassign */

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'add/comment',
  (newComment: Omit<Comment, 'id'>) => createComment(newComment),
);

export const deleteComment = createAsyncThunk(
  'delete/comment',
  async (commentId: number) => {
    await deleteCommentFromServer(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = true;
      state.hasError = '';
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = false;
      state.hasError = 'Fetch Comments Error';
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
