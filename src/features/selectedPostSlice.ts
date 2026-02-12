/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

type SelectedPostType = {
  selectedPost: Post | null;
};

const initState: SelectedPostType = {
  selectedPost: null,
};

const selectedPostSlicer = createSlice({
  name: 'selectedPost',
  initialState: initState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const selectedPostReducer = selectedPostSlicer.reducer;
export const { setSelectedPost } = selectedPostSlicer.actions;
export const selectedPostState = (state: RootState) => state.selectedPost;
