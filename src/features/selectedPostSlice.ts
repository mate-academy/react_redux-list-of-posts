/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostSliceState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostSliceState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    removePost: state => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, removePost } = selectedPostSlice.actions;
