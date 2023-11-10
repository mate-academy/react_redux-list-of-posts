/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

export interface PostsState {
  value: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

export const loadPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const value = await postsApi.getPostComments(id);

    return value;
  },
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const postsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = [...state.value, ...action.payload];
      })
      .addCase(loadPosts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPost.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = state.value.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});
