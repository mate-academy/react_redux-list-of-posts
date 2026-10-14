import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_selectedPost, action: PayloadAction<Post | null>) =>
      action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
