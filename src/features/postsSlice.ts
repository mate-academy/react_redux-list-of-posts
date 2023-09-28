/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = {
  posts: [] as Post[],
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (posts, action: PayloadAction<Post[]>) => {
      posts.posts = action.payload;
    },
    setErrors: (posts, action: PayloadAction<string>) => {
      posts.error = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
