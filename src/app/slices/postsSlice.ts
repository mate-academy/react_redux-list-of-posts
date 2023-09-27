/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: false,
};

// prettier-ignore
export const fetchPosts = createAsyncThunk(
  'posts/fetch', (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = false;
    },

    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    resetPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PostsState>) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default postsSlice.reducer;
export const { resetPosts, selectPost, resetPost } = postsSlice.actions;
