/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostSelected {
  post: Post | null;
}

const initialState: PostSelected = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
