import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setCurrentPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { setCurrentPost } = currentPostSlice.actions;
export default currentPostSlice.reducer;
