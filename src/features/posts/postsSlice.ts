/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const fetchedPostByUserId = createAsyncThunk(
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
      .addCase(fetchedPostByUserId.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchedPostByUserId.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(fetchedPostByUserId.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
