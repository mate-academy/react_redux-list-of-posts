import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPost = createSlice({
  name: 'selectedPosts',
  initialState: null as Post | null,
  reducers: {
    setSelectedPosts: (_, action: PayloadAction<Post | null>) => action.payload,
    clearSelectedPost: () => null,
  },
});

export const { setSelectedPosts, clearSelectedPost } = selectedPost.actions;
export default selectedPost.reducer;
