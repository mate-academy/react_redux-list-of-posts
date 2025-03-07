import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost(_state, action: PayloadAction<Post | null>) {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
