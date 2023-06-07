/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

interface PostState {
  posts: Post[],
  selectedPost: Post | null,
  loading: boolean,
  error: boolean,
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = true;
      });
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = false;
        state.error = false;
      });
    builder
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
export const { setPost } = postsSlice.actions;
