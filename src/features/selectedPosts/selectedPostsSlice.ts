import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
/* eslint-disable no-param-reassign */

type SelectedPost = {
  currentPost: Post | null;
};

const initialState: SelectedPost = {
  currentPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    removePost: state => {
      state.currentPost = null;
    },
  },
});

export const { setPost, removePost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
