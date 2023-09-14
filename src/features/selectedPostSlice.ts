/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  selectedPost: Post | null,
};

const initialPost: PostState = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },

    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setPost, clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;
