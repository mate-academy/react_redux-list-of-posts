/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: { post: Post | null } = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      state.post = action.payload;
    },

    clearSelectedPost(state) {
      state.post = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
