/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = {
  selectedPost: Post | null;
};

const initialState: SelectedPost = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
