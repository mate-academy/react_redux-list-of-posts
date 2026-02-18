/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = {
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};

export const initialState: PostState = {
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<Post>) {
      state.selectedPost = action.payload;
    },
    cleanPost(state) {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setPost, cleanPost } = selectedPostSlice.actions;
