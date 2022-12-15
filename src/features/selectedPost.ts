/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPost.reducer;
export const { setSelectedPost } = selectedPost.actions;
