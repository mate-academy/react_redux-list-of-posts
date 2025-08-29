/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: SelectedPost = {
  selectedPost: null,
  loaded: false,
  hasError: false,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPost.reducer;
export const { setSelectedPost } = selectedPost.actions;
