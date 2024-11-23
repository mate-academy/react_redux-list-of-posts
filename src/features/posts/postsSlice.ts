import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsSlice {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: false,
}

export const fetchPosts = createAsyncThunk<Post[], number | undefined>(
  'posts/fetchPosts',
  async (userId?: number) => {
    if (userId) {
      return await getUserPosts(userId);
    }
    return await getPosts();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.hasError = false;
    },
    clearPosts: (state) => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
export const { clearError, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
