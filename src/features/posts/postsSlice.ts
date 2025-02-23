/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  error: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  posts: [],
  error: false,
  loaded: false,
};

export const loadPosts = createAsyncThunk(
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
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, state => {
        state.loaded = true;
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
