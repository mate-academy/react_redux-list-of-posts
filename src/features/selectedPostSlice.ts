import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { setPost } = selectedPostSlice.actions;
