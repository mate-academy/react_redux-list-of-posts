/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) => state.selectedPost.post;

export default selectedPostSlice.reducer;
