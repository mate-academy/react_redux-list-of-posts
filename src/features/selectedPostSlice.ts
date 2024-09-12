/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitType = null | Post;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as InitType,
  reducers: {
    changeSelectedPost: (_post, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { changeSelectedPost } = selectedPostSlice.actions;
