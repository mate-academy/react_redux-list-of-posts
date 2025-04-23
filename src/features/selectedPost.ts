import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
    clearSelectedPost: () => null,
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPost.actions;
export default selectedPost.reducer;
