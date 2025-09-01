/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { PostsState } from '../types/PostsState';

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPostId: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const data = await client.get<Post[]>(`/posts?userId=${userId}`);

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { selectPost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;
export const selectSelectedPostId = (state: RootState) =>
  state.posts.selectedPostId;

export default postsSlice.reducer;
