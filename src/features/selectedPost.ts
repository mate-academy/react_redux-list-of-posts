/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types';

type PostState = {
  selectedPost: Post | null;
};

const initialState: PostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;
