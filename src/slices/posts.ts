import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: true,
  posts: [] as Post[],
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (authorId: number) => {
  return getUserPosts(authorId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(loadPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const PostsActions = {
  ...postsSlice.actions,
  loadPosts,
};
