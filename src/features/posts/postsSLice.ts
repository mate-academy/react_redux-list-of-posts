/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserPosts,
} from '../../api/posts';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface PostsState {
  value: Post[];
  currentPost: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  currentPost: null,
  status: 'idle',
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    clear: (state) => {
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.value = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCurrentPost, clear } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.value;
export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const resetCurrentPost = () => setCurrentPost(null);

export default postsSlice.reducer;
