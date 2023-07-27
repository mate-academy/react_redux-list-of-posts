/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};
const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: false,
};

export const getAsyncPosts = createAsyncThunk(
  'posts/get',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(getAsyncPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.posts = action.payload;
    });

    builder.addCase(getAsyncPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
