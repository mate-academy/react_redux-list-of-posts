import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPostState,
  reducers: {
    setSelectedPost: (_, action) => action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
