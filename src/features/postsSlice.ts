import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import type { RootState } from '../app/store';

export type PostsState = {
  posts: Post[],
  postsIsLoading: boolean,
  postsIsError: boolean,
  selectedPostId: number | null,
};

const initialState: PostsState = {
  posts: [],
  postsIsLoading: false,
  postsIsError: false,
  selectedPostId: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action:PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setPostsIsLoading: (state, action:PayloadAction<boolean>) => {
      state.postsIsLoading = action.payload;
    },
    setPostsError: (state, action:PayloadAction<boolean>) => {
      state.postsIsError = action.payload;
    },
    setSelectedPostId: (state, action:PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsIsLoading
  = (state: RootState) => state.posts.postsIsLoading;
export const selectPostsError = (state: RootState) => state.posts.postsIsError;
export const selectSelectedPostId
  = (state: RootState) => state.posts.selectedPostId;
export const selectCurrentPost = (state: RootState) => {
  const { posts, selectedPostId } = state.posts;

  return posts.find(post => post.id === selectedPostId);
};

export const {
  setPosts,
  setPostsIsLoading,
  setPostsError,
  setSelectedPostId,
} = postsSlice.actions;

export default postsSlice.reducer;
