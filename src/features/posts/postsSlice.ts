import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/getPosts', (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
