/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectPostById = (postId: number | null) => (state: RootState) => {
  return (
    state.posts.items?.find(post => post.id === postId) ||
    state.posts.items.find(post => post.id === postId) ||
    null
  );
};

export const selectedPostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
