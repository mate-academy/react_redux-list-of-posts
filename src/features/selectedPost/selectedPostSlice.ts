/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null,
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export const selectPost = (state: RootState) => state.selectedPost.post;

export default selectedPostSlice.reducer;
