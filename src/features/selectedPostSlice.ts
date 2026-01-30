import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    set: (_state, { payload }: PayloadAction<Post>) => payload,
    clear: () => null,
  },
});

export const { set, clear } = selectedPost.actions;

export default selectedPost.reducer;
