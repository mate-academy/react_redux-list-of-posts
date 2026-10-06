import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null as SelectedPostState;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    saveSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
    clearSelectedPost: () => {
      return initialState;
    },
  },
});

export default selectedPostSlice.reducer;
export const { saveSelectedPost, clearSelectedPost } =
  selectedPostSlice.actions;
