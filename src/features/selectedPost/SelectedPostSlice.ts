/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export const { selectPost, clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
export type { PostsState };
