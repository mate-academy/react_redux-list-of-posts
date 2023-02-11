/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.posts = action.payload;
      });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
