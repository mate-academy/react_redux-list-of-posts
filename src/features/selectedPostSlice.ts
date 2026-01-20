/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostI {
  selectedPost: Post | null;
}

const initialState: SelectedPostI = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
