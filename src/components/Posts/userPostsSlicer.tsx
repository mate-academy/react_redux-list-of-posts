/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/axiosClient';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

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
  async (selectedUserId: number) => {
    return client.get<Post[]>(`/posts?userId=${selectedUserId}`);
  },
);

export const postsSlice = createSlice(
  {
    name: 'posts',
    initialState,
    reducers: {
      selectAuthor: (state, action) => {
        state.selectedAuthor = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.posts = action.payload;
        })
        .addCase(fetchUserPosts.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });
    },
  },
);

export const { selectAuthor } = postsSlice.actions;
export const getPosts = (state: RootState) => state.posts.posts;
export const getSelectedAuthor = (
  state: RootState,
) => state.posts.selectedAuthor;

export const getError = (state: RootState) => state.error.error;
export const getLoading = (state: RootState) => state.loading.loading;

export default postsSlice.reducer;
