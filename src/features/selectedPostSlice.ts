// src/features/selectedPostSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import type { RootState } from '../app/store';

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
    setSelectedPost(state, action: PayloadAction<Post | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;

// selector
export const selectSelectedPost = (state: RootState) =>
  state.selectedPost.selectedPost;
