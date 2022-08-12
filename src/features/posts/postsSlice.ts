/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

interface PostState {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsLoading(state) {
      state.loaded = false;
    },

    postsLoadingSuccess(state, action: PayloadAction<Post[]>) {
      state.loaded = true;
      state.hasError = false;
      state.posts = action.payload;
    },

    postsLoadingFail(state) {
      state.loaded = true;
      state.hasError = true;
    },
  },
});

export const {
  postsLoading,
  postsLoadingSuccess,
  postsLoadingFail,
} = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
