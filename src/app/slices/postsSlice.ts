/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export const loadUserPosts = createAsyncThunk(
  'posts/fetchPosts',
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
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUserPosts.rejected, (state) => {
        state.error = "Can't load posts";
        state.isLoading = false;
      });
  },
});

export const { setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
