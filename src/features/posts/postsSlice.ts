/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

import { Post } from '../../types/Post';

export interface PostsState {
  selectedPost: Post | null,
  posts: Post[]
  isLoading: boolean,
  error: string
}

const initialState: PostsState = {
  selectedPost: null,
  posts: [],
  isLoading: false,
  error: '',
};

export const downloadUsersPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(downloadUsersPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(downloadUsersPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(downloadUsersPosts.rejected, (state) => {
      state.error = 'Error message';
      state.isLoading = false;
    });
  },
});

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
