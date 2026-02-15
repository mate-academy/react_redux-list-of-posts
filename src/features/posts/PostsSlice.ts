import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { loadPosts } from './Thunks';

type PostsState = {
  loaded: boolean;
  items: Post[];
  hasError: string;
};

const initialState: PostsState = {
  loaded: false,
  items: [],
  hasError: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => ({
      ...state,
      hasError: '',
      loaded: true,
    }));
    builder.addCase(loadPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: false,
    }));
    builder.addCase(loadPosts.rejected, (state, action) => ({
      ...state,
      hasError: action.error.message || '',
      loaded: false,
    }));
  },
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;
export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
