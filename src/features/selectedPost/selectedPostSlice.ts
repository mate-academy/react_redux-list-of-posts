/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SelectedPostState {
  selectedPostId: number | null;
}

const initialState: SelectedPostState = {
  selectedPostId: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export const selectSelectedPost = (state: RootState) => {
  const postId = state.selectedPost.selectedPostId;

  return state.posts.items.find(post => post.id === postId) || null;
};

export default selectedPostSlice.reducer;
