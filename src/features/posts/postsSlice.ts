/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[] | [];
  selectedPost: Post | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    posts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    post: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { posts, post } = postsSlice.actions;

export default postsSlice.reducer;
