/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

const initialState = {
  selectedPost: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'setSelectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;

export const { setSelectedPost } = selectedPostSlice.actions;
