/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

const initialState = {
  selectedPost: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: state => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) =>
  state.selectedPost.selectedPost;

export default selectedPostSlice.reducer;
