/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';

export interface PostState {
  selectedPost: Post | null;
}

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state: PostState, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    removePost: (state: PostState) => {
      state.selectedPost = null;
    },
  },
});

export const { removePost, addPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
