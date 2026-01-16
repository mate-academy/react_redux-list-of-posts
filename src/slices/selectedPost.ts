/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  value: Post | null;
};

const initialState: PostState = {
  value: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectedPost(state, action: PayloadAction<Post | null>) {
      state.value = action.payload;
    },

    clearSelectedPost(state) {
      state.value = null;
    },
  },
});

export const { selectedPost, clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;
