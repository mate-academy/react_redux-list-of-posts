/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    clear: (state) => {
      state.post = null;
    },
  },
});

export const selectSelectedPost = (state: RootState) => state.selectedPost.post;
export const { setPost, clear: clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
