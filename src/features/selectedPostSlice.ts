/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  selectedPost: Post | null;
};

const initialState: PostsState = {
  selectedPost: null,
};

const postsSloce = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default postsSloce.reducer;
export const { selectPost } = postsSloce.actions;
