/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';

export type PostState = Post | null;

const initialState: PostState = null;

export const selectedPostSlice = createSlice<PostState>({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_state, action: PayloadAction<PostState>) => {
      return action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
