/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    setPost: (_, { payload }: PayloadAction<SelectedPost>) => payload,
  },
});

export default selectedPostSlice.reducer;
export const { setPost } = selectedPostSlice.actions;
