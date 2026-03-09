import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentFromServer,
} from '../api/comments';
import { Comment } from '../types/Comment';
/* eslint-disable no-param-reassign */

type InitialState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  comments: [],
  loading: false,
  error: '',
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
  (comentId: number) => {
    deleteCommentFromServer(comentId);

    return comentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loading = false;
      state.error = 'Fetch Comments Error';
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
