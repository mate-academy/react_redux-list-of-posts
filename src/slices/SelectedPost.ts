/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

export interface SelectedPostState {
  selectedPost: Post | null;
}

export const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    initSelectedPost: (state, actions) => {
      state.selectedPost = actions.payload;
    },
  },
});

export const selectSelectedPost = (state: RootState) => state.selectedPost;

export const { initSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
