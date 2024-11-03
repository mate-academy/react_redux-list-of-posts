/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  postComments: Comment[];
  error: boolean;
  loaded: boolean;
}

const initialState: CommentsState = {
  postComments: [],
  error: false,
  loaded: false,
};

export const loadPostComments = createAsyncThunk(
  'postComments/fetchComments',
  async (postId: number) => {
    const postComments = await getPostComments(postId);

    return postComments;
  },
);

export const deleteComment = createAsyncThunk(
  'deletePostComments/fetchDeleteComments',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

export const addComment = createAsyncThunk(
  'addPostComments/fetchAddComments',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name: data.name,
      email: data.email,
      body: data.body,
      postId: data.postId,
    });

    return newComment;
  },
);

export const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.postComments = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loaded = true;
        state.error = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.postComments = [...state.postComments, action.payload];
      })
      .addCase(addComment.rejected, state => {
        state.error = true;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.postComments = state.postComments.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export default postCommentsSlice.reducer;
