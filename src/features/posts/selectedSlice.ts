import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
/* eslint-disable no-param-reassign */

type SelectedPostSlice = {
  selectedPost: Post | null;
};

const initialState: SelectedPostSlice = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost(
      state: SelectedPostSlice,
      action: PayloadAction<Post | null>,
    ) {
      state.selectedPost = action.payload;
    },
    clearSelectedPost(state: SelectedPostSlice) {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
