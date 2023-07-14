/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostsState {
  selectedPost: Post | null;
}

const initialState: SelectedPostsState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostsState, action: PayloadAction<Post | null>,
    ) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
