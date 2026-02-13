/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { RootState } from '../store';

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

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

// Селектори
export const selectPostsState = (state: RootState) => state.posts;

export const selectPosts = createSelector(
  selectPostsState,
  posts => posts.items,
);

export const selectPostsLoaded = createSelector(
  selectPostsState,
  posts => posts.loaded,
);

export const selectPostsError = createSelector(
  selectPostsState,
  posts => posts.hasError,
);

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
