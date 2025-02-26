/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface CurrentPostState {
  currentPost: Post | null;
}

const initialState: CurrentPostState = {
  currentPost: null,
};

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: state => {
      state.currentPost = null;
    },
  },
});

export const { setCurrentPost, clearCurrentPost } = currentPostSlice.actions;
export default currentPostSlice.reducer;
