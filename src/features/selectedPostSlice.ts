import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = Post | null;
const initialState = null as SelectedPost;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<SelectedPost>) => action.payload,
    remove: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
