/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loader: boolean,
  error: boolean,
};

const initialState: PostsState = {
  posts: [],
  loader: false,
  error: false,
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetch',
  async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loader = true;
      state.error = false;
    });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.loader = false;
      state.error = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.posts = action.payload;
      state.error = false;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
