/* eslint-disable no-param-reassign */
import { Post } from '../types/Post';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedPost: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, { payload }: PayloadAction<Post | null>) {
      state.selectedPost = payload;
    },
  },
});
