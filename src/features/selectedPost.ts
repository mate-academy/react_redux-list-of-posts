import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

/* eslint-disable no-param-reassign */
export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    clearSelectedPost: state => {
      state.selectedPost = null;
    },

    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
