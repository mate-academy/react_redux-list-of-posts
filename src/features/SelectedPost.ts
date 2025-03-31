import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default SelectedPostSlice.reducer;
export const { setPost } = SelectedPostSlice.actions;
