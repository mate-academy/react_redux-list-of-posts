import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export type SelectedPostType = Post | null;

const initialState: SelectedPostType = null as SelectedPostType;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
