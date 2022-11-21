/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment, CommentData } from '../../types/Comment';
import { Post } from '../../types/Post';
// eslint-disable-next-line import/no-cycle
import { fetchUserPosts } from '../Posts/userPostsSlicer';
import * as commentsApi from '../../api/comments';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface CommentsState {
  comments: Comment[];
  loading: 'idle' | 'loading' | 'failed';
  error: string,
  selectedPost: Post | null,
}

const initialState: CommentsState = {
  comments: [],
  loading: 'idle',
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

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ name, email, body }: CommentData, { getState }) => {
    const state = getState() as RootState;
    const postId = state.comments.selectedPost!.id;

    return commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

// const addComment = async ({ name, email, body }: CommentData) => {
//   try {
//     const newComment = await commentsApi.createComment({
//       name,
//       email,
//       body,
//       postId: post.id,
//     });
//
//     setComments(
//       currentComments => [...currentComments, newComment],
//     );
//
//     // setComments([...comments, newComment]);
//     // works wrong if we wrap `addComment` with `useCallback`
//     // because it takes the `comments` cached during the first render
//     // not the actual ones
//   } catch (error) {
//     // we show an error message in case of any error
//     setError(true);
//   }
// };

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
          state.loading = 'loading';
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.comments = state.comments && state.comments.filter(
            comment => comment.id !== action.payload.id,
          );
        })
        .addCase(deleteComment.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });

      builder
        .addCase(fetchPostComments.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(fetchPostComments.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.comments = action.payload.comments;
          state.selectedPost = action.payload.selectedPost;
        })
        .addCase(fetchPostComments.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });

      builder
        .addCase(fetchUserPosts.fulfilled, (state) => {
          state.comments = [];
          state.selectedPost = null;
        });

      builder
        .addCase(createComment.fulfilled, (state, action) => {
          state.comments = [...state.comments, action.payload];
        });
    },
  },
);

export const selectComments = (state: RootState) => state.comments.comments;
export const getPost = (state: RootState) => state.comments.selectedPost;
export const getLoading = (state: RootState) => state.loading.loading;
export const getError = (state: RootState) => state.error.error;

export const { clearSelectedPost } = commentsSlice.actions;

export default commentsSlice.reducer;
