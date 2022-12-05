/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment, CommentData } from '../../types/Comment';
import { Post } from '../../types/Post';
import { fetchUserPosts } from '../Posts/userPostsSlicer';
import * as commentsApi from '../../api/comments';
import { ErrorTypes, LoadingStatus } from '../../types/enums';

export interface CommentsState {
  comments: Comment[];
  loading: LoadingStatus;
  error: string,
  selectedPost: Post | null,
}

const initialState: CommentsState = {
  comments: [],
  loading: LoadingStatus.Idle,
  error: '',
  selectedPost: null,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchComments',
  async (post: Post) => {
    return {
      selectedPost: post,
      comments: await commentsApi.getPostComments(post.id),
    };
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return { id: commentId };
  },
);

export const createComment
  = createAsyncThunk<Comment, CommentData, { state: RootState }>(
    'comments/createComment',
    async ({
      name,
      email,
      body,
      postId,
    }: CommentData) => {
      return commentsApi.createComment({
        name,
        email,
        body,
        postId,
      });
    },
  );

export const commentsSlice = createSlice(
  {
    name: 'comments',
    initialState,
    reducers: {
      clearSelectedPost: (state) => {
        state.selectedPost = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteComment.pending, (state) => {
          state.loading = LoadingStatus.Loading;
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
          state.loading = LoadingStatus.Idle;
          state.comments = state.comments && state.comments.filter(
            comment => comment.id !== action.payload.id,
          );
        })
        .addCase(deleteComment.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });

      builder
        .addCase(fetchPostComments.pending, (state) => {
          state.loading = LoadingStatus.Loading;
        })
        .addCase(fetchPostComments.fulfilled, (state, action) => {
          state.loading = LoadingStatus.Idle;
          state.error = '';
          state.comments = action.payload.comments;
          state.selectedPost = action.payload.selectedPost;
        })
        .addCase(fetchPostComments.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });

      builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.loading = LoadingStatus.Loading;
        })
        .addCase(fetchUserPosts.fulfilled, (state) => {
          state.loading = LoadingStatus.Idle;
          state.error = '';
          state.comments = [];
          state.selectedPost = null;
        })
        .addCase(fetchUserPosts.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });

      builder
        .addCase(createComment.fulfilled, (state, action) => {
          state.comments = [...state.comments, action.payload];
          state.loading = LoadingStatus.Idle;
          state.error = '';
        })
        .addCase(createComment.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });
    },
  },
);

export const selectComments = (state: RootState) => state.comments.comments;
export const getPost = (state: RootState) => state.comments.selectedPost;
export const getLoading = (state: RootState) => state.comments.loading;
export const getError = (state: RootState) => state.comments.error;

export const { clearSelectedPost } = commentsSlice.actions;

export default commentsSlice.reducer;
