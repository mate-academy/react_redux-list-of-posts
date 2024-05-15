import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (id: number) => {
    const response = await getUserPosts(id);

    return response;
  },
);

export type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = 'Error';
      });
  },
});

export const selectPostState = (state: RootState) => state.posts;

export default postsSlice.reducer;
