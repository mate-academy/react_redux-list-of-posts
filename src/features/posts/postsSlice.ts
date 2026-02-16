import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = 'Failed to load posts';
      });
  },
});

export default postsSlice.reducer;
