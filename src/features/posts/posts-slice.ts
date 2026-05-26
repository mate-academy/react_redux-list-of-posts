/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  selectedPost: Post[];
}

const initialState: PostsState = {
  selectedPost: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
