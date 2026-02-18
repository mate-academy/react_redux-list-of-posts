import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type AuthorState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: AuthorState = {
  posts: [],
  loading: false,
  error: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    CLEAR: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.loading = false;
      });
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
