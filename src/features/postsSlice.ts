import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
