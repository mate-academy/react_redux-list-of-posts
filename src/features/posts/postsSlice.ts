import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Post } from '../../types/Post';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPostsByUser = createAsyncThunk<Post[], number>(
  'posts/fetchByUser',
  async userId => {
    const res = await fetch(`/api/posts.json?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to load posts');
    return res.json();
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;

export const selectPosts = (s: { posts: PostsState }) => s.posts.items;
export const selectPostsLoaded = (s: { posts: PostsState }) => s.posts.loaded;
export const selectPostsHasError = (s: { posts: PostsState }) =>
  s.posts.hasError;
