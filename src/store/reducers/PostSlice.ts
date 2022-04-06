/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { fetchPosts, removePost } from './ActionCreators';

export interface PostState {
  posts: Post[];
  arePostsLoading: boolean;
  errorLoadingPosts: string;
  selectedPostId: number | null;
}

const initialState: PostState = {
  posts: [],
  arePostsLoading: false,
  errorLoadingPosts: '',
  selectedPostId: null,
};

export const postSlice: Slice<PostState> = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPostId(state, action: PayloadAction<number>) {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.arePostsLoading = false;
      state.errorLoadingPosts = action.payload;
    },
    [fetchPosts.pending.type]: (state) => {
      state.arePostsLoading = true;
    },
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
      state.arePostsLoading = false;
      state.errorLoadingPosts = '';
      state.posts = action.payload;
    },

    [removePost.pending.type]: (state) => {
      state.arePostsLoading = true;
    },
    [removePost.fulfilled.type]: (state) => {
      state.arePostsLoading = false;
      state.errorLoadingPosts = '';
    },
    [removePost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.arePostsLoading = false;
      state.errorLoadingPosts = action.payload;
    },
  },
});

export default postSlice.reducer;
