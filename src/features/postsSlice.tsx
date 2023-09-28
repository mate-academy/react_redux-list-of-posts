/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
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
      state.loading = true;
    });

    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
