/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

interface PostsState {
  loaded: boolean
  hasError: boolean
  items: Post[]
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadPosts = createAsyncThunk(
  'posts/setPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { removePosts } = postsSlice.actions;
export default postsSlice.reducer;
