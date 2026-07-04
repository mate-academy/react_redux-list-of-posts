/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export type SelectedPostState = Post | null;

const initialState: SelectedPostState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as SelectedPostState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
