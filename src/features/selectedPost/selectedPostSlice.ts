import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPostState = Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPostState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
