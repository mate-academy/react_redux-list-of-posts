import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';

import { Post } from '../../types/Post';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (id: number) =>
  getUserPosts(id),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      /*eslint no-param-reassign: "error"*/
      state.posts = action.payload;
    },

    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.error = 'Unable to load posts';
      state.isLoading = true;
    });
  },
});

export const { setSelectedPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
