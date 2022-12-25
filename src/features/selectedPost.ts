import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const initialState = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as SelectedPostState,
  reducers: {
    setPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { setPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
