/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = {
  currentPost: Post | null;
};

const initialState: PostState = {
  currentPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
