/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export const selectPosts = (state: RootState): Post[] => state.posts.items;

export default postsSlice.reducer;
