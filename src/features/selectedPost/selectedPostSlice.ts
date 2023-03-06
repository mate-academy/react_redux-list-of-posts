/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostState, action : PayloadAction<Post | null>,
    ) => {
      state.selectedPost = action.payload;
    },
    reSetSelectedPost: (
      state: SelectedPostState,
    ) => {
      state.selectedPost = null;
    },
  },
});
export const { setSelectedPost, reSetSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
