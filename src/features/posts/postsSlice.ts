/* eslint-disable no-param-reassign */
// src/features/posts/postsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
// Importe a RootState se você a definiu em src/app/store.ts
// import type { RootState } from '../../app/store';

// Usando um tipo mock para evitar erros de 'any' nos seletores se RootState não estiver definido
type RootStateMock = any;

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

export const selectAllPosts = (state: RootStateMock): Post[] =>
  state.posts.items;

export const selectSelectedPostId = (state: RootStateMock): number | null =>
  state.posts.selectedPostId;

export const selectPostsLoaded = (state: RootStateMock): boolean =>
  state.posts.loaded;

export const selectPostsHasError = (state: RootStateMock): boolean =>
  state.posts.hasError;

export const selectPostById = (
  state: RootStateMock,
  postId: number | null | undefined,
): Post | undefined => {
  if (postId == null) {
    return undefined;
  }

  return state.posts.items.find((post: Post) => post.id === postId);
};
