import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export const selectedPost = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_status, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPost.actions;
export default selectedPost.reducer;
