import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post | null = null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
