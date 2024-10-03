/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface PostState {
  selectedPost: Post | null;
}

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
