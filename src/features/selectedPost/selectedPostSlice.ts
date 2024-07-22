import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    selectPost: (_state, action) => action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { selectPost, clearSelectedPost } = selectedPostSlice.actions;
