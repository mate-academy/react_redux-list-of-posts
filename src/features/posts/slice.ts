/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './thunks';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
    setSelected: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts, setSelected } = postsSlice.actions;

export default postsSlice.reducer;
