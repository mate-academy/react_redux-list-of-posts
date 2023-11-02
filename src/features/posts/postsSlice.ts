/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  hasError: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  hasError: false,
  loaded: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (id: number) => {
    const posts = await getUserPosts(id);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPostsState = (state: RootState) => state.posts;
export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
