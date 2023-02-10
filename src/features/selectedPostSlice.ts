/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  post: Post | null
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
    closePost(state) {
      state.post = null;
    },
  },
});

export const { setPost, closePost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
