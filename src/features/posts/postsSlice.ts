import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsSlice {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostsSlice = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk<Post[], number | undefined>(
  'posts/fetchPosts',
  async (userId?: number) => {
    if (userId) {
      return getUserPosts(userId);
    }

    return getPosts();
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: state => {
      state.hasError = '';
    },
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = 'Failed to load posts. Please try again later.';
        state.loaded = true;
      });
  },
});

export const { clearError, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
