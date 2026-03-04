/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetchAll',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: { posts: PostsState }) => state.posts.items;
export const selectPostsLoaded = (state: { posts: PostsState }) =>
  state.posts.loaded;
export const selectPostsHasError = (state: { posts: PostsState }) =>
  state.posts.hasError;
export const selectSelectedPost = (state: { posts: PostsState }) =>
  state.posts.selectedPost;

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
