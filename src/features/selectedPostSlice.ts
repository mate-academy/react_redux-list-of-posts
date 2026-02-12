import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice: Slice<SelectedPostState> = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostState,
      action: PayloadAction<Post>,
    ) => {
      state.selectedPost = action.payload;
    },
    removeSelectedPost: (state: SelectedPostState) => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, removeSelectedPost } =
  selectedPostSlice.actions;
