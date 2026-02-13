/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const loadedPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadedPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadedPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(loadedPosts.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong!';
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
