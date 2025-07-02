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
  loaded: false,
  hasError: false,
};

export const postsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const data = await getUserPosts(userId);

    return data;
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
      .addCase(postsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(postsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
