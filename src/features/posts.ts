/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  isLoaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState = {
  posts: [] as PostsState['posts'],
  isLoaded: false,
  hasError: false,
  selectedPost: null as PostsState['selectedPost'],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoaded = false;
      });
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.hasError = true;
        state.isLoaded = true;
      });
  },
});

export default PostsSlice.reducer;
export const { actions } = PostsSlice;
