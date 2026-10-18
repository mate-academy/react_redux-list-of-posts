import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => action.payload,
    clear: () => null,
  },
});

export const { set: setSelectedPost, clear: clearSelectedPost } =
  selectedPostSlice.actions;

export default selectedPostSlice.reducer;
