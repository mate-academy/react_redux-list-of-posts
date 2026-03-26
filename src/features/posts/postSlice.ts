/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setHasError } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => !state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;

export default postsSlice.reducer;
