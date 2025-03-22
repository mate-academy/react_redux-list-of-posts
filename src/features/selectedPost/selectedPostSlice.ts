/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  selectedPost: Post | null;
}

const initialState: PostsState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, { payload }: PayloadAction<Post | null>) => {
      if (payload) {
        state.selectedPost = payload;
      } else {
        state.selectedPost = null;
      }
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
