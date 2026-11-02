/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPost {
  items: Post | null;
}

const initialState: SelectedPost = {
  items: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.items = action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: { selectedPost: SelectedPost }) =>
  state.selectedPost.items;
export default selectedPostSlice.reducer;
