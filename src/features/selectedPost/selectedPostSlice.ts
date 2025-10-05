/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    clearSelectedPost: () => initialState,
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { clearSelectedPost, setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
