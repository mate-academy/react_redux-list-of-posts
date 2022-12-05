/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';
import { ErrorTypes, LoadingStatus } from '../../types/enums';

export interface PostsState {
  selectedAuthor: User;
  posts: Post[];
  loading: LoadingStatus;
  error: string,
}

const initialState: PostsState = {
  selectedAuthor: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  posts: [],
  loading: LoadingStatus.Idle,
  error: '',
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (user: User) => {
    return {
      selectedAuthor: user,
      posts: await getUserPosts(user.id),
    };
  },

);

export const postsSlice = createSlice(
  {
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.loading = LoadingStatus.Loading;
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          state.loading = LoadingStatus.Idle;
          state.selectedAuthor = action.payload.selectedAuthor;
          state.posts = action.payload.posts;
        })
        .addCase(fetchUserPosts.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });
    },
  },
);

export const getPosts = (state: RootState) => state.posts.posts;
export const getSelectedAuthor = (
  state: RootState,
) => state.posts.selectedAuthor;
export const getError = (state: RootState) => state.posts.error;
export const getLoading = (state: RootState) => state.posts.loading;

export default postsSlice.reducer;
