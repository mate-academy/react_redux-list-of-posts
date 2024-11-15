import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  error: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.error = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
