/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    clear: state => {
      state.selectedPost = null;
    },
    set: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPost.reducer;
export const { actions } = selectedPost;
