import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostType = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPostType,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<SelectedPostType>) =>
      action.payload,
  },
});
