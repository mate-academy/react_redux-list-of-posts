/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
