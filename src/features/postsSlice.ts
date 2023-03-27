/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type State = {
  posts: Post[];
  selectedPost: Post | null;
  hasError: boolean;
  loaded: boolean;
};

const initialState: State = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (
  userId: number,
) => {
  const posts = await getUserPosts(userId);

  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchPosts.pending, (state) => {
        // state.selectedPost = null;
        state.loaded = false;
        state.hasError = false;
      });
  },
});

export const { setPost, setError, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;
