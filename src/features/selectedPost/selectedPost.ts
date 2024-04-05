/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from '../../types/Post';

type State = {
  post: Post | null;
};

const initialState: State = {
  post: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const selectPost = (state: RootState) => state.selectedPost.post;
export const { setSelectedPost } = postSlice.actions;

export default postSlice.reducer;
