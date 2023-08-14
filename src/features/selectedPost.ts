/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  post: Post | null;
};

const initialPost: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost,
  reducers: {
    setSelectedPost: (selectedPost, action: PayloadAction<Post>) => {
      selectedPost.post = action.payload;
    },
    clearSelectedPost: (selectedPost) => {
      selectedPost.post = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
