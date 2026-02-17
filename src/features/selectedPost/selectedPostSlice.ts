/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = {
  selectedPost: Post | null;
};

const initialState: PostState = {
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
