import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: null,
};

export const loadPosts = createAsyncThunk('posts/load', async () => {
  return getPosts();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Failed to load users';
      });
  },
});

export default postsSlice.reducer;
export const { setLoaded, setError, setPosts } = postsSlice.actions;
