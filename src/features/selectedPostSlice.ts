/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  selectedPost: Post | null,
};

const initialState: PostState = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    removePost: (state) => {
      state.selectedPost = null;
    },
  },
});

export default postSlice.reducer;
export const { selectPost, removePost } = postSlice.actions;
