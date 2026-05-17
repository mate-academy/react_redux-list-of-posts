/* eslint-disable no-param-reassign */
import { Post } from './../../types/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
