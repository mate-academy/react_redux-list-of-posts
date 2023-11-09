/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = Post | null;

const authorSlice = createSlice({
  name: 'post',
  initialState: null as PostState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<PostState>) => action.payload,
    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = authorSlice.actions;
export default authorSlice.reducer;
