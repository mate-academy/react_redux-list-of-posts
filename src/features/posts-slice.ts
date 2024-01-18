import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface State {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: State = {
  loaded: false,
  hasError: false,
  posts: [] as Post[],
};

export const initPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    const post = await getUserPosts(userId);

    return post;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    /* eslint-disable no-param-reassign */
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.posts = action.payload;
    });
    builder.addCase(initPosts.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
