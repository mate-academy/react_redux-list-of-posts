import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlide = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_, action: PayloadAction<Post>) => {
      return action.payload;
    },
    clearPost: () => {
      return null;
    },
  },
});

export default selectedPostSlide.reducer;
export const { setPost, clearPost } = selectedPostSlide.actions;
