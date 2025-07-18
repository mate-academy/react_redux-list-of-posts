/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts, getUserPosts } from '../api/posts';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('fetch/posts', async () => {
  const posts = await getPosts();

  return posts;
});

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
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
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.items = [];
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = false;
        state.items = [];
        state.hasError = true;
      })
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchPostsByUser.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
