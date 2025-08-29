import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts, getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    return getPosts();
  },
);

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, state => {
      state.isLoading = false;
      state.error = 'Failed to fetch posts';
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
