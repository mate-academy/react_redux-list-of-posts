/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPostState,
  reducers: {
    addSelectedPost: (_, action: PayloadAction<Post>) => action.payload,
    removeSelectedPost: () => null,
  },
});

export const {
  addSelectedPost,
  removeSelectedPost,
} = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
