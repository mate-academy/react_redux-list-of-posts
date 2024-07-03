import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
