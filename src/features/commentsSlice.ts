/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [] as Comment[],
  loaded: true,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => getPostComments(postId),
);

export const createPostComment = createAsyncThunk(
  'comments/createComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deletePostComment = createAsyncThunk(
  'comments/deletePostComments',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const postCommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments.push(action.payload);
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default postCommentsSlice.reducer;
