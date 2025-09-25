import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';

interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

/* eslint-disable no-param-reassign */
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) =>
  state.selectedPost.selectedPost;
