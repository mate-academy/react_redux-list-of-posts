/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PostsState {
  selectedAuthor: User;
  posts: Post[];
  loading: 'idle' | 'loading' | 'failed';
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
  loading: 'idle',
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
          state.loading = 'loading';
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.selectedAuthor = action.payload.selectedAuthor;
          state.posts = action.payload.posts;
        })
        .addCase(fetchUserPosts.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });
    },
  },
);

export const getPosts = (state: RootState) => state.posts.posts;
export const getSelectedAuthor = (
  state: RootState,
) => state.posts.selectedAuthor;

export const getError = (state: RootState) => state.error.error;
export const getLoading = (state: RootState) => state.loading.loading;

export default postsSlice.reducer;
