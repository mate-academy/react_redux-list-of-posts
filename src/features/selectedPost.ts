/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialPost: SelectedPostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost as SelectedPostState,
  reducers: {
    setSelectedPost: (post, action: PayloadAction<Post>) => {
      post = action.payload;

      return post;
    },
    clearSelectedPost: (post) => {
      post = null;

      return post;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
