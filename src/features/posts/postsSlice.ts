/* eslint-disable no-param-reassign */
// src/features/posts/postsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import type { RootState } from '../../app/store';

// ----------------------------------------------------------------------
// THUNK
// ----------------------------------------------------------------------

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    // <--- Os parênteses vazios resolvem a inferência
    const posts = await getPosts();

    return posts;
  },
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

interface PostsState {
  items: Post[];
  selectedPostId: number | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  selectedPostId: null,
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postSelected(state, action: PayloadAction<number | null>) {
      state.selectedPostId = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      // FETCH POSTS: Pending
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      // FETCH POSTS: Fulfilled
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      // FETCH POSTS: Rejected
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export const { postSelected } = postsSlice.actions;

export default postsSlice.reducer;

// ----------------------------------------------------------------------
// SELETORES
// ----------------------------------------------------------------------

export const selectAllPosts = (state: RootState): Post[] => state.posts.items;

export const selectSelectedPostId = (state: RootState): number | null =>
  state.posts.selectedPostId;

export const selectPostsLoaded = (state: RootState): boolean =>
  state.posts.loaded;

export const selectPostsHasError = (state: RootState): boolean =>
  state.posts.hasError;

export const selectPostById = (
  state: RootState,
  postId: number | null | undefined,
): Post | undefined => {
  if (postId == null) {
    return undefined;
  }

  return state.posts.items.find((post: Post) => post.id === postId);
};
