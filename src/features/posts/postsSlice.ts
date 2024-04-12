/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface UserState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | number;
  selectedPostId: number;
}

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: 0,
  selectedPostId: 0,
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    onPostSelected: (state, action) => {
      state.selectedPost = action.payload;
      state.selectedPostId =
        typeof action.payload === 'number' ? action.payload : action.payload.id;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectPosts = (state: RootState) => {
  return {
    posts: state.posts.items,
    loaded: state.posts.loaded,
    hasError: state.posts.hasError,
    selectedPost: state.posts.selectedPost,
    selectedPostId: state.posts.selectedPostId,
  };
};

export const { onPostSelected } = postsSlice.actions;

export default postsSlice.reducer;
