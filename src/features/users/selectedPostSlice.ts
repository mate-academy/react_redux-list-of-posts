import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectPost: (_state, action) => action.payload,
    clearSelectedPost: () => null,
  },
});

export default selectedPostSlice.reducer;
export const { setSelectPost, clearSelectedPost } = selectedPostSlice.actions;
