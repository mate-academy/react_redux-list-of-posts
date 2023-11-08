/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialStateOfSelectedPost: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialStateOfSelectedPost,
  reducers: {
    selectNewPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { selectNewPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
